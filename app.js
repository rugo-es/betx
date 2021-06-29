"use strict"

require('dotenv').config(); 
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')
const morgan = require('morgan')
const fs = require('fs')
const moment = require('moment')

// const sequelize = require(path.join(__dirname, '/app/config/db'))

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/app/views'))
app.set('partials', path.join(__dirname, '/app/views/partials'))

app.use(morgan('[:date[clf]] :method ":url" :status', {
  stream: fs.createWriteStream(path.join(__dirname, 'app/log/access_'+moment().format('YYYYMMDD')+'.log'), { flags: 'a' })
}))
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/css', express.static(path.join(__dirname, 'app/assets/css')))
app.use('/js', express.static(path.join(__dirname, 'app/assets/js')))
app.use('/img', express.static(path.join(__dirname, 'app/assets/img')))

const mainRoutes = require(path.join(__dirname, 'app/routes/main-routes'))
app.use(mainRoutes)

const appRoutes = require(path.join(__dirname, 'app/routes/app-routes'))
app.use('/app', appRoutes)

const usersRoutes = require(path.join(__dirname, 'app/routes/users'))
app.use('/api', usersRoutes)

const matchesRoutes = require(path.join(__dirname, 'app/routes/matches'))
app.use('/api', matchesRoutes)

const teamsRoutes = require(path.join(__dirname, 'app/routes/teams'))
app.use('/api', teamsRoutes)

const leaguesRoutes = require(path.join(__dirname, 'app/routes/leagues'))
app.use('/api', leaguesRoutes)

const statsTeamsRoutes = require(path.join(__dirname, 'app/routes/statsTeams'))
app.use('/api', statsTeamsRoutes)

const statsTeamsStreaksRoutes = require(path.join(__dirname, 'app/routes/statsTeamsStreaks'))
app.use('/api', statsTeamsStreaksRoutes)

app.listen(port, () => {
  console.log('Example app listening at http://localhost:'+port)

  /*
  sequelize.authenticate().then(() =>{
    console.log('Connected to database successfully')
  }).catch(()=>{
    console.log('Failed to connect to database')
  })
  sequelize.sync({force: false}).then(() =>{
    console.log('Synchronized with the database correctly')
  }).catch(()=>{
    console.log('Failed to sync to database')
  })
  */

})
