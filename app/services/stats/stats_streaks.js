"use strict"

const { Op } = require("sequelize")
const models = require('../../models')
const Team = models.Team
const Match = models.Match
const StatsStreaks = models.StatsStreaks


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
    StatsStreaks.create(stats).then((stats) => {
      resolve(stats)
    }).catch(err => {
      reject(err)
    })
  })
}

async function run(){

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
    
  }

}

run()