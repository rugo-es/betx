"use strict"

const { Op } = require("sequelize")
const models = require('../../models')
const Team = models.Team
const Match = models.Match
const StatsTeamsStreaks = models.StatsTeamsStreaks
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
    StatsTeamsStreaks.create(stats).then((stats) => {
      resolve(stats)
    }).catch(err => {
      reject(err)
    })
  })
}

const updateStatsTeams = (team, stats) => {
  return new Promise((resolve, reject) => {
    StatsTeams.findOne({ where: {teamId: team} }).then(statsTeam => {
      StatsTeams.update(stats, { where: { teamId: team }}).then(() => {
        resolve(team)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}

const truncateStatsTeams = () => {
  return new Promise((resolve, reject) => {
    StatsTeamsStreaks.destroy({ truncate: true, cascade: false }).then(() => {
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
    let season = '0';
    let ties_streak = 1;
    let last_journey = 1;
    let streaks = [0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0 ,0,0,0,0,0];
    for (let i = 0; i < matches.length; i++){
      if(matches[i].seasonId != season){
        if(season != '0'){
          if(ties_streak != 1){
            streaks[ties_streak-1]++;
            let stats = {
              leagueId: matches[i-1].leagueId,
              seasonId: matches[i-1].seasonId,
              teamId: team,
              journey_start: last_journey,
              journey_end: matches[i-1].journey,
              num_matches: ties_streak-1,
              tie: 0
            }
            await addStats(stats)
            last_journey = 1;
          }
        }
        ties_streak = 1;
        season = matches[i].seasonId
      }
      if(matches[i].result == 'X'){
        streaks[ties_streak]++;
        let stats = {
          leagueId: matches[i].leagueId,
          seasonId: matches[i].seasonId,
          teamId: team,
          journey_start: last_journey,
          journey_end: matches[i].journey,
          num_matches: ties_streak,
          tie: 1
        }
        await addStats(stats)
        last_journey = matches[i].journey + 1;
        ties_streak = 1;
      }else{
        ties_streak++;
      }
      
    }
    let fin = true 
    while(fin){
      if(streaks[streaks.length-1] == 0){
        streaks.pop()
      }else{
        fin = false
      }
    }
    let sum_streaks = 0, sum_num_matches = 0, sum_acum_num_matches = 0, acum_pond = 0
    for (let i = 0; i < streaks.length; i++){
      acum_pond += streaks[i] * i
      sum_streaks += streaks[i]
      if(streaks[i] != 0){
        sum_num_matches += i
        sum_acum_num_matches++
      }
    }
    let stats = {
      max_streak_ties: (streaks.length - 1),
      avg_streak_ties: sum_num_matches/sum_acum_num_matches,
      avg_pond_streak_ties: acum_pond/sum_streaks
    }
    await updateStatsTeams(team, stats)
  }
}

run()