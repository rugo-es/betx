"use strict"

const express = require('express')
const matchesController = require('../controllers/matches')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/matches', md_auth.ensureAuth, matchesController.getAll)
app.get('/matches/:id', md_auth.ensureAuth, matchesController.getById)
app.post('/matches', md_auth.ensureAuth, matchesController.create)
app.put('/matches/:id', md_auth.ensureAuth, matchesController.update)
app.delete('/matches/:id', md_auth.ensureAuth, matchesController.destroy)


module.exports = app