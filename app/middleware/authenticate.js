"use strict"

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = process.env.JWT_KEY

function ensureAuth(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({message: 'Authorization header not found'})
  }
  let token = req.headers.authorization.replace(/['"]+/g, '')
  let payload
  try{
    payload = jwt.decode(token, secret)
    if(payload.exp <= moment().unix){
      return res.status(401).send({message: 'Expired token'})
    }
  }catch(ex){
    console.log(ex)
    return res.status(404).send({message: 'Invalid token'})
  }
  req.user = payload
  next()
}

module.exports = {
  ensureAuth
}