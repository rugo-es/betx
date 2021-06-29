"use strict"

const models = require('../models')
const Team = models.Team

function getAll(req, res){
  try{
    Team.findAll({
      where: req.body,
      order : [['name', 'ASC']]
    }).then(teams => {
      res.json(teams)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res){
  try{
    Team.findByPk(req.params.id).then(team => {
      res.json(team)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try{
    let team = req.body
    Team.create(team).then((team) => {
      res.json(team)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res){
  try{
    Team.findByPk(req.params.id).then(team => {
      Team.update(req.body, { where: { id: team.id }}).then(() => {
        res.status(400).send(team)
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
    Team.findByPk(req.params.id).then(team => {
      let id = team ? team.id : 0;
      Team.destroy({ where: { id: id }}).then(() => {
        res.json(team)
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