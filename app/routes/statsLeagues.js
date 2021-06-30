"use strict"

const express = require('express')
const statsLeaguesController = require('../controllers/statsLeagues')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/statsLeagues', md_auth.ensureAuth, statsLeaguesController.getAll)
app.get('/statsLeagues/:league', md_auth.ensureAuth, statsLeaguesController.getByLeague)
app.post('/statsLeagues', md_auth.ensureAuth, statsLeaguesController.create)
app.put('/statsLeagues/:id', md_auth.ensureAuth, statsLeaguesController.update)
app.delete('/statsLeagues/:id', md_auth.ensureAuth, statsLeaguesController.destroy)

module.exports = app