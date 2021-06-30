"use strict"

const models = require('../models')
const StatsLeagues = models.StatsLeagues

function getAll(req, res){
  try{
    StatsLeagues.findAll({ where: req.body, include: 'league' }).then(stats => {
      res.json(stats)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getByLeague(req, res){
  try{
    StatsLeagues.findOne({ where: {LeagueId: req.params.league} }).then(stats => {
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
    StatsLeagues.create(stats).then((stats) => {
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
    StatsLeagues.findByPk(req.params.id).then(stats => {
      StatsLeagues.update(req.body, { where: { id: stats.id }}).then(() => {
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
    StatsLeagues.findByPk(req.params.id).then(stats => {
      let id = stats ? stats.id : 0;
      StatsLeagues.destroy({ where: { id: id }}).then(() => {
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
  getByLeague,
  create,
  update,
  destroy
}