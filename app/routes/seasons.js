"use strict"

const express = require('express')
const seasonsController = require('../controllers/seasons')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/seasons', md_auth.ensureAuth, seasonsController.getAll)
app.get('/seasons/:id', md_auth.ensureAuth, seasonsController.getById)
app.post('/seasons', md_auth.ensureAuth, seasonsController.create)
app.put('/seasons/:id', md_auth.ensureAuth, seasonsController.update)
app.delete('/seasons/:id', md_auth.ensureAuth, seasonsController.destroy)

module.exports = app