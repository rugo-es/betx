"use strict"

const models = require('../models')
const League = models.League

function getAll(req, res){
  try{
    League.findAll({
      where: req.body,
      order : [['id', 'ASC']]
    }).then(leagues => {
      res.json(leagues)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res){
  try{
    League.findByPk(req.params.id).then(league => {
      res.json(league)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try{
    let league = req.body
    League.create(league).then((league) => {
      res.json(league)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res){
  try{
    League.findByPk(req.params.id).then(league => {
      League.update(req.body, { where: { id: league.id }}).then(() => {
        res.status(400).send(league)
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
    League.findByPk(req.params.id).then(league => {
      let id = league ? league.id : 0;
      League.destroy({ where: { id: id }}).then(() => {
        res.json(league)
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