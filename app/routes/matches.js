"use strict"

const express = require('express')
const teamsController = require('../controllers/teams')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/teams', md_auth.ensureAuth, teamsController.getAll)
app.get('/teams/:id', md_auth.ensureAuth, teamsController.getById)
app.post('/teams', md_auth.ensureAuth, teamsController.create)
app.put('/teams/:id', md_auth.ensureAuth, teamsController.update)
app.delete('/teams/:id', md_auth.ensureAuth, teamsController.destroy)

module.exports = app