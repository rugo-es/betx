"use strict"

const cdn = require('../config/cdn')

function home(req, res){
  res.render('home', {
    title: 'Home', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery, 
      cdn.js.bootstrap.bundle, 
      '/js/app.js' 
    ],
    cards : [{
      style: 'bg-dark',
      command : 'npm i express',
      title : 'express',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      npmLink: 'https://npmjs.com/package/express',
      websiteLink : 'https://expressjs.com/' 
    },{
      style: 'bg-danger',
      command : 'npm i mustache',
      title : 'mustache',
      description: 'mustache.js is a zero-dependency implementation of the mustache template system in JavaScript.',
      npmLink: 'https://www.npmjs.com/package/mustache'
    },{
      style: 'bg-danger',
      command : 'npm i mustache-express',
      title : 'mustache-express',
      description: 'Mustache Express lets you use Mustache and Express together, including auto-loading partials.',
      npmLink: 'https://www.npmjs.com/package/mustache-express'
    },{
      style: 'bg-success',
      command : 'npm i sequelize',
      title : 'sequelize',
      description: 'Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.',
      npmLink: 'https://www.npmjs.com/package/sequelize',
      websiteLink : 'https://sequelize.org/'
    },{
      style: 'bg-success',
      command : 'npm i mysql2',
      title : 'mysql2',
      description: 'MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl...',
      npmLink: 'https://www.npmjs.com/package/mysql2'
    },{
      style: 'bg-light',
      command : 'npm i jwt-simple',
      title : 'jwt-simple',
      description: 'JWT(JSON Web Token) encode and decode module for node.js.',
      npmLink: 'https://www.npmjs.com/package/jwt-simple'
    },{
      style: 'bg-light',
      command : 'npm i bcrypt',
      title : 'bcrypt',
      description: 'The bcrypt library on NPM makes it really easy to hash and compare passwords in Nodejs.',
      npmLink: 'https://www.npmjs.com/package/bcrypt'
    },{
      style: 'bg-info',
      command : 'npm i multer',
      title : 'multer',
      description: 'Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.',
      npmLink: 'https://www.npmjs.com/package/mustache-express'
    },{
      style: 'bg-primary',
      command : 'npm i dotenv',
      title : 'dotenv',
      description: 'Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.',
      npmLink: 'https://www.npmjs.com/package/dotenv'
    },{
      style: 'bg-info',
      command : 'npm i body-parser',
      title : 'body-parser',
      description: 'Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.',
      npmLink: 'npmjs.com/package/body-parser'
    },{
      style: 'bg-secondary',
      command : 'npm i moment',
      title : 'moment',
      description: 'A JavaScript date library for parsing, validating, manipulating, and formatting dates.',
      npmLink: 'https://www.npmjs.com/package/moment',
      websiteLink: 'https://momentjs.com/'
    },{
      style: 'bg-warning',
      command : 'npm i path',
      title : 'path',
      description: 'The path module provides utilities for working with file and directory paths.',
      npmLink: 'https://www.npmjs.com/package/path'
    },{
      style: 'bg-secondary',
      command : 'npm i morgan',
      title : 'morgan',
      description: 'HTTP request logger middleware for node.js',
      npmLink: 'https://www.npmjs.com/package/morgan'
    },{
      style: 'bg-success',
      command : 'npm i nodemailer',
      title : 'nodemailer',
      description: 'Nodemailer is a module for Node.js applications to allow easy as cake email sending 🍰',
      npmLink: 'https://www.npmjs.com/package/nodemailer',
      websiteLink: 'https://nodemailer.com/about/'
    }]
  })
}

function textEffects(req, res){
  res.render('textillate', {
    title: 'Textillate', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      cdn.css.animate.textillate,
      cdn.css.animate.default,
      cdn.css.bootstrap.icons,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle,
      cdn.js.lettering, 
      cdn.js.textillate, 
      '/js/app.js',
      '/js/text-effects.js'
    ]
  })
}

function datatable(req, res){
  res.render('datatable', {
    title: 'Datatable', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      cdn.css.datatable,
      cdn.css.worldFlagsSprite,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      '/js/datatable.js',
      '/js/app.js' 
    ]
  })
}

function amcharts(req, res){
  res.render('amcharts', {
    title: 'amcharts', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery, 
      cdn.js.bootstrap.bundle,
      '/js/app.js',
      cdn.js.amcharts.core,
      cdn.js.amcharts.charts,
      cdn.js.amcharts.timeline,
      cdn.js.amcharts.bullets,
      cdn.js.amcharts.animated,
      cdn.js.amcharts.theme.dark,
      '/js/amcharts.js'
    ]
  })
}

function lightbox(req, res){
  res.render('lightbox', {
    title: 'LightBox', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      cdn.css.lightbox,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery, 
      cdn.js.bootstrap.bundle,
      cdn.js.lightbox,
      '/js/app.js',
      '/js/lightbox.js'
      
    ]
  })
}

function matches(req, res){
  res.render('matches', {
    title: 'Matches', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      cdn.css.datatable,
      cdn.css.worldFlagsSprite,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      '/js/app.js',
      '/js/matches.js'
      
    ]
  })
}

function leagues(req, res){
  res.render('leagues', {
    title: 'Leagues', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/app.js',
      cdn.js.amcharts.core,
      cdn.js.amcharts.charts,
      cdn.js.amcharts.timeline,
      cdn.js.amcharts.bullets,
      cdn.js.amcharts.animated,
      cdn.js.amcharts.theme.dark,
      cdn.js.datatable,
      '/js/leagues.js'
      
    ]
  })
}

function teams(req, res){
  res.render('teams', {
    title: 'Teams', 
    nav: true,
    mainClass: 'container mt-5 pt-3',
    css: [
      cdn.css.bootswatch.cyborg, 
      cdn.css.datatable,
      cdn.css.worldFlagsSprite,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/app.js',
      cdn.js.amcharts.core,
      cdn.js.amcharts.charts,
      cdn.js.amcharts.timeline,
      cdn.js.amcharts.bullets,
      cdn.js.amcharts.animated,
      cdn.js.amcharts.theme.dark,
      cdn.js.datatable,
      '/js/teams.js'
      
    ]
  })
}

module.exports = {
  home,
  textEffects,
  datatable,
  amcharts,
  lightbox,
  matches, 
  leagues,
  teams
}