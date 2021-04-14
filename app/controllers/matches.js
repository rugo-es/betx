"use strict"

const models = require('../models')
const Match = models.Match

function getAll(req, res){
  try{
    Match.findAll({where: req.body}).then(matches => {
      res.json(matches)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res){
  try{
    Match.findByPk(req.params.id).then(match => {
      res.json(match)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try{
    let match = req.body
    Match.create(match).then((match) => {
      res.json(match)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res){
  try{
    Match.findByPk(req.params.id).then(match => {
      Match.update(req.body, { where: { id: match.id }}).then(() => {
        res.status(400).send(match)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })  
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function destroy(req, res){
  try{
    Match.findByPk(req.params.id).then(match => {
      let id = match ? match.id : 0;
      Match.destroy({ where: { id: match.id }}).then(() => {
        res.json(match)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })    
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}