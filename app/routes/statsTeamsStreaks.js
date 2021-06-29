"use strict"

const express = require('express')
const statsTeamsStreaksController = require('../controllers/statsTeamsStreaks')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/statsTeamsStreaks', md_auth.ensureAuth, statsTeamsStreaksController.getAll)
app.get('/statsTeamsStreaks/:team', md_auth.ensureAuth, statsTeamsStreaksController.getByTeam)
app.post('/statsTeamsStreaks', md_auth.ensureAuth, statsTeamsStreaksController.create)
app.put('/statsTeamsStreaks/:id', md_auth.ensureAuth, statsTeamsStreaksController.update)
app.delete('/statsTeamsStreaks/:id', md_auth.ensureAuth, statsTeamsStreaksController.destroy)

module.exports = app