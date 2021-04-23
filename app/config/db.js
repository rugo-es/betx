"use strict"

require('dotenv').config({path:__dirname+'/./../../.env'})

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": "mysql"
}