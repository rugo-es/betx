"use strict"

require('dotenv').config()
const jwt = require('jwt-simple')
const moment = require('moment')
const secret = process.env.JWT_KEY

function createToken(user){
  
  let payload = {
    sub: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }
  return jwt.encode(payload, secret)
}

function decodeToken(token){
  return jwt.decode(token, secret)
}

module.exports = {
  createToken,
  decodeToken
}