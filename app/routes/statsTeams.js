"use strict"

const express = require('express')
const statsTeamsController = require('../controllers/statsTeams')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/statsTeams', md_auth.ensureAuth, statsTeamsController.getAll)
app.get('/statsTeams/:team', md_auth.ensureAuth, statsTeamsController.getByTeam)
app.post('/statsTeams', md_auth.ensureAuth, statsTeamsController.create)
app.put('/statsTeams/:id', md_auth.ensureAuth, statsTeamsController.update)
app.delete('/statsTeams/:id', md_auth.ensureAuth, statsTeamsController.destroy)

module.exports = app