"use strict"

const { Op } = require("sequelize")
const models = require('../../models')
const Team = models.Team
const Match = models.Match


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
    Match.findAll({where: { [Op.or]: [{localId: team}, {visitorId: team}]}, include: ['local', 'visitor', 'league'], order: ['seasonId', 'journey'] })
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const updateTeam = (team, data) => {
  return new Promise((resolve, reject) => {
    Team.findOne({ where: {id: team} }).then(dataTeam => {
      Team.update(data, { where: { id: team }}).then(() => {
        resolve(team)
      }).catch(err => {
        reject(err)
      })
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
    if(matches.length > 0){
      let data = { countryId: matches[0].league.countryId }
      updateTeam(team, data)
    } 
    
  }

}

run()