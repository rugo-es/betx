"use strict"

const models = require('../models')
const StatsTeamsStreaks = models.StatsTeamsStreaks

function getAll(req, res){
  try{
    StatsTeamsStreaks.findAll({ where: req.body }).then(stats => {
      res.json(stats)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getByTeam(req, res){
  try{
    StatsTeamsStreaks.findAll({ where: {teamId: req.params.team} }).then(stats => {
      res.json(stats)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try{
    let stats = req.body
    StatsTeamsStreaks.create(stats).then((stats) => {
      res.json(stats)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res){
  try{
    StatsTeamsStreaks.findByPk(req.params.id).then(stats => {
      StatsTeamsStreaks.update(req.body, { where: { id: stats.id }}).then(() => {
        res.status(400).send(stats)
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
    StatsTeamsStreaks.findByPk(req.params.id).then(stats => {
      let id = stats ? stats.id : 0;
      StatsTeamsStreaks.destroy({ where: { id: id }}).then(() => {
        res.json(stats)
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
  getByTeam,
  create,
  update,
  destroy
}