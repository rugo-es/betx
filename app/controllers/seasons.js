"use strict"

const models = require('../models')
const Season = models.Season

function getAll(req, res){
  try{
    Season.findAll({
      where: req.body,
      order : [['name', 'ASC']]
    }).then(seasons => {
      res.json(seasons)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res){
  try{
    Season.findByPk(req.params.id).then(season => {
      res.json(season)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try{
    let season = req.body
    Season.create(season).then((season) => {
      res.json(season)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res){
  try{
    Season.findByPk(req.params.id).then(season => {
      Season.update(req.body, { where: { id: season.id }}).then(() => {
        res.status(400).send(season)
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
    Season.findByPk(req.params.id).then(season => {
      let id = season ? season.id : 0;
      Season.destroy({ where: { id: id }}).then(() => {
        res.json(season)
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