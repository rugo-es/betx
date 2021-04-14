"use strict"

const express = require('express')
const mainRoutesController = require('../controllers/main-routes')
const usersController = require('../controllers/users')

let app = express.Router()

app.get('/', mainRoutesController.landing)
app.get('/login', mainRoutesController.login)
app.get('/register', mainRoutesController.register)
app.post('/auth/login', usersController.login)

module.exports = app