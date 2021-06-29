"use strict"

const express = require('express')
const statsController = require('../controllers/stats')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/stats', md_auth.ensureAuth, statsController.getAll)
app.get('/stats/:team', md_auth.ensureAuth, statsController.getByTeam)
app.post('/stats', md_auth.ensureAuth, statsController.create)
app.put('/stats/:id', md_auth.ensureAuth, statsController.update)
app.delete('/stats/:id', md_auth.ensureAuth, statsController.destroy)

module.exports = app