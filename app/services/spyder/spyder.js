"use strict"

const axios = require('axios')
const cheerio = require('cheerio')

const models = require('../../models');
const Team = models.Team;
const Match = models.Match;
const League = models.League;
const Season = models.Season;


// Descargar informacion
// Precarga de equipos 
// Cargar partidos

var data = []

let journeys = 15
for (let i = 1; i < journeys; i++){
  setTimeout( ()=>{get_journey(i).then(()=>{ console.log(i) } ) } , i*1000  )
}

setTimeout( ()=>{console.log(data)}, journeys*1000+1000)


async function get_journey(journey){
  await axios.get(domain+'/'+league+season+'/grupo1/jornada'+journey).then((response) => {

    let $ = cheerio.load(response.data)
  
    let exist = $('#pretempbox div h3')
    if(exist.text().includes('partidos')){console.log('No hay partidos'); return;}
  
    let matchTable = $('#tabla1 tr.vevent')
    let date, date_format, local, visitor, marker, link;
    for (let i = 0; i < matchTable.length; i++){
      
      date = $(matchTable[i]).find('td.fecha')
      // let dt = dateTime.create(date.data('date'));
      // date_format = dt.format('Y-m-d H:M:S');
      local = $(matchTable[i]).find('td.equipo1').text().trim()
      visitor = $(matchTable[i]).find('td.equipo2').text().trim()
      marker = $(matchTable[i]).find('td.rstd a').text().split('-');
      link = $(matchTable[i]).find('a.url').attr('href')

      /*
      console.log(local)
      let findLocal = teams.find((team)=>{ return team.name === local})
      if( findLocal === undefined){
        console.log('-- AGREGAR EQUIPO')
        let localId = createTeam(local)
        console.log(localId.id)
      }else{
        console.log('** '+findLocal.id)
      }
      console.log(visitor)
      if(teams.find((team)=>{ return team.name === visitor}) === undefined){
        console.log('-- AGREGAR EQUIPO')
      }
      */
      data.push({journey: journey, local: local, visitor: visitor})
      console.log(date.data('date')+" "+local+" - "+visitor+": "+domain+link)
    }
  })
}



var domain = 'https://www.resultados-futbol.com'
var league = 'primera';
var season = 2001;

var teams;

/*
Team.findAll()
.then(data => {
  teams = data
})
.then(() => {

  for (let i = 1; i < 2; i++){
    setTimeout( ()=>{get_journey(i).then(()=>{ console.log(i) } ) } , i*1000  )
  }

})
.catch(err => {
  console.log('error')
})

*/


/*
async function get_journey(journey){
  await axios.get(domain+'/'+league+season+'/grupo1/jornada'+journey).then((response) => {

    let $ = cheerio.load(response.data)
  
    let exist = $('#pretempbox div h3')
    if(exist.text().includes('partidos')){console.log('No hay partidos'); return;}
  
    let matchTable = $('#tabla1 tr.vevent')
    let date, date_format, local, visitor, marker, link;
    for (let i = 0; i < matchTable.length; i++){
      
      date = $(matchTable[i]).find('td.fecha')
      // let dt = dateTime.create(date.data('date'));
      // date_format = dt.format('Y-m-d H:M:S');
      local = $(matchTable[i]).find('td.equipo1').text().trim()
      visitor = $(matchTable[i]).find('td.equipo2').text().trim()
      marker = $(matchTable[i]).find('td.rstd a').text().split('-');
      link = $(matchTable[i]).find('a.url').attr('href')

      
      console.log(local)
      let findLocal = teams.find((team)=>{ return team.name === local})
      if( findLocal === undefined){
        console.log('-- AGREGAR EQUIPO')
        let localId = createTeam(local)
        console.log(localId.id)
      }else{
        console.log('** '+findLocal.id)
      }
      console.log(visitor)
      if(teams.find((team)=>{ return team.name === visitor}) === undefined){
        console.log('-- AGREGAR EQUIPO')
      }
      console.log(date.data('date')+" "+local+" - "+visitor+": "+domain+link)
    }
  })
}

async function createTeam(name){
  await Team.create({name: name}).then((team) => {
    return team
  }).catch(err => {
    console.log(err)
  })
}
*/




/*
Match.create({
  localId: 1,
  local_goals: 1,
  visitorId: 2,
  visitor_goals: 1,
  match_date: '2021-04-14 12:00:00',
  leagueId: 1,
  seasonId: 1,
  journey: 1,
  result: 'X'
})
.then((newTeam) => {
  console.log(newTeam.get())
})
.catch((err) => {
  console.log("Error while company creation : ", err)
})


League.create({
  name: "Primera división española"
})
.then((newTeam) => {
  console.log(newTeam.get())
})
.catch((err) => {
  console.log("Error while company creation : ", err)
})

Season.create({
  name: "2020-2021"
})
.then((newTeam) => {
  console.log(newTeam.get())
})
.catch((err) => {
  console.log("Error while company creation : ", err)
})



Team.create({
  name: "Real Madrid",
  icon: "realmadrid.png"
})
.then((newTeam) => {
  console.log(newTeam.get())
})
.catch((err) => {
  console.log("Error while company creation : ", err)
})

Team.create({
  name: "Getafe",
  icon: "getafe.png"
})
.then((newTeam) => {
  console.log(newTeam.get())
})
.catch((err) => {
  console.log("Error while company creation : ", err)
})
*/