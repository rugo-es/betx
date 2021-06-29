"use strict"

const express = require('express')
const statsStreaksController = require('../controllers/statsStreaks')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/statsStreaks', md_auth.ensureAuth, statsStreaksController.getAll)
app.get('/statsStreaks/:team', md_auth.ensureAuth, statsStreaksController.getByTeam)
app.post('/statsStreaks', md_auth.ensureAuth, statsStreaksController.create)
app.put('/statsStreaks/:id', md_auth.ensureAuth, statsStreaksController.update)
app.delete('/statsStreaks/:id', md_auth.ensureAuth, statsStreaksController.destroy)

module.exports = app