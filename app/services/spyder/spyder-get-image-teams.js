"use strict"

const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
var fs = require('fs')
const Path = require('path')

const models = require('../../models')
const Team = models.Team


const getTeams = () => {
  return new Promise((resolve, reject) => {
    Team.findAll({where: {icon: null}})
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
    Team.findByPk(team).then(team => {
      Team.update(data, { where: { id: team.id }}).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })  
    }).catch(err => {
      reject(err)
    })
  })
}

const getImageTeam = (link, teamId) => {
  return new Promise((resolve, reject) => {
    axios.get(link).then((response) => {
      let $ = cheerio.load(response.data)
      let img = $('#previewArea').find('img')
      downloadImage(img[0].attribs.src, 'id-'+teamId+'.jpg')      
      resolve()
    })
  })
}

async function downloadImage(link, filename) {
  const url = link
  const path = Path.resolve(__dirname, '../../assets/img/teams/', filename)
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })
  response.data.pipe(fs.createWriteStream(path))
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })
    response.data.on('error', () => {
      reject()
    })
  })
}

async function run(){
  let teams = await getTeams()
  for(var i = 0; i < teams.length; i++){
    console.log(i, '-',  teams[i].name)
    await getImageTeam(teams[i].link, teams[i].id)
    await updateTeam(teams[i].id, { icon: 'id-'+teams[i].id+'.jpg'})
  }
}

run()