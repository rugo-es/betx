"use strict"

const { Op } = require("sequelize")
const models = require('../../models')
const Team = models.Team
const Match = models.Match
const StatsTeams = models.StatsTeams

const getTeams = () => {
  return new Promise((resolve, reject) => {
    Team.findAll()
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getMatchesByTeam = (team) => {
  return new Promise((resolve, reject) => {
    Match.findAll({where: { [Op.or]: [{localId: team}, {visitorId: team}]}, include: ['local', 'visitor'], order: ['seasonId', 'journey'] })
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const addStats = (stats) => {
  return new Promise((resolve, reject) => {
    StatsTeams.create(stats).then((stats) => {
      resolve(stats)
    }).catch(err => {
      reject(err)
    })
  })
}

const truncateStatsTeams = () => {
  return new Promise((resolve, reject) => {
    StatsTeams.destroy({ truncate: true, cascade: false }).then(() => {
      resolve()
    }).catch(err => {
      reject(err)
    }) 
  })
}

async function run(){
  await truncateStatsTeams()
  var teams = await getTeams()
  for (let j = 0; j < teams.length; j++){
    let team = teams[j].id
    var matches = await getMatchesByTeam(team)
    let num_matches = 0, num_matches_finished = 0, wins = 0, losses = 0, ties = 0
    for (let i = 0; i < matches.length; i++){
      num_matches++
      if(matches[i].state == 'Finalizado'){ num_matches_finished++ }
      if( (team == matches[i].localId && matches[i].result == '1') || (team == matches[i].visitorId && matches[i].result == '2') ){ wins++ }
      if( (team == matches[i].localId && matches[i].result == '2') || (team == matches[i].visitorId && matches[i].result == '1') ){ losses++ }
      if(matches[i].result == 'X'){ ties++ }
    }
    let stats = {
      teamId: team,
      num_matches: num_matches,
      num_matches_finished: num_matches_finished,
      wins: wins,
      per_wins: (wins/num_matches_finished),
      losses: losses,
      per_losses: (losses/num_matches_finished),
      ties: ties,
      per_ties: (ties/num_matches_finished)
    }
    console.log(stats)
    await addStats(stats)
  }  
}

run()