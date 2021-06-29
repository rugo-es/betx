"use strict"

const express = require('express')
const leaguesController = require('../controllers/leagues')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/leagues', md_auth.ensureAuth, leaguesController.getAll)
app.get('/leagues/:id', md_auth.ensureAuth, leaguesController.getById)
app.post('/leagues', md_auth.ensureAuth, leaguesController.create)
app.put('/leagues/:id', md_auth.ensureAuth, leaguesController.update)
app.delete('/leagues/:id', md_auth.ensureAuth, leaguesController.destroy)

module.exports = app