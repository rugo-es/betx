"use strict"

const { Op } = require("sequelize")
const models = require('../../models')
const Leagues = models.League
const Match = models.Match
const StatsLeagues = models.StatsLeagues


const getLeagues = () => {
  return new Promise((resolve, reject) => {
    Leagues.findAll()
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getMatchesByLeague = (league) => {
  return new Promise((resolve, reject) => {
    Match.findAll({where: { LeagueId: league}, order: ['leagueId', 'seasonId', 'journey'] })
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
    StatsLeagues.create(stats).then((stats) => {
      resolve(stats)
    }).catch(err => {
      reject(err)
    })
  })
}

const truncateStatsLeagues = () => {
  return new Promise((resolve, reject) => {
    StatsLeagues.destroy({ truncate: true, cascade: false }).then(() => {
      resolve()
    }).catch(err => {
      reject(err)
    }) 
  })
}

async function run(){
  await truncateStatsLeagues()
  var leagues = await getLeagues()
  for (let j = 0; j < leagues.length; j++){
    let league = leagues[j].id
    var matches = await getMatchesByLeague(league)
    let num_matches = 0, num_matches_finished = 0, no_ties = 0, ties = 0
    for (let i = 0; i < matches.length; i++){
      num_matches++
      if(matches[i].state == 'Finalizado'){ 
        num_matches_finished++ 
        if(matches[i].result == 'X'){ ties++ }else{ no_ties++ }
      }
    }
    let stats = {
      leagueId: league,
      num_matches: num_matches,
      num_matches_finished: num_matches_finished,
      no_ties: no_ties,
      per_no_ties: (no_ties/num_matches_finished),
      ties: ties,
      per_ties: (ties/num_matches_finished)
    }
    console.log(stats)
    await addStats(stats)
  }
}

run()