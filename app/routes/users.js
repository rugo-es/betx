"use strict"

const express = require('express')
const usersController = require('../controllers/users')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/users', md_auth.ensureAuth, usersController.getAll)
app.get('/users/:id', md_auth.ensureAuth, usersController.getById)
app.post('/users', usersController.create)
app.put('/users/:id', md_auth.ensureAuth, usersController.update)
app.delete('/users/:id', md_auth.ensureAuth, usersController.destroy)
app.get('/checkToken', usersController.checkToken)
app.post('/uploadAvatar', usersController.uploadAvatar)


module.exports = app