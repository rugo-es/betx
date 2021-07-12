"use strict"

const cdn = require('../config/cdn')

function landing(req, res){
  res.render('landing', {
      title: 'Landing page',
      nav: false,
      mainClass: 'container',
      css: [ cdn.css.bootswatch.cyborg, '/css/style.css' ],
      scripts: [ cdn.js.jquery, cdn.js.bootstrap.bundle ]
    }
  )
}

function login(req, res){
  res.render('login', {
      title: 'Login',
      nav: false,
      bodyClass: 'text-center',
      mainClass: 'form-signin',
      css: [ cdn.css.bootstrap.default, cdn.css.bootswatch.cyborg, '/css/signin.css', '/css/style.css' ],
      scripts: [ cdn.js.jquery, 'js/alerts.js', 'js/users.js' ]
    } 
  )
}

function register(req, res){
  res.render('register', {
      title: 'Register',
      nav: false,
      bodyClass: 'text-center',
      mainClass: 'container',
      css: [ cdn.css.bootstrap.default, cdn.css.bootswatch.cyborg, '/css/signin.css', '/css/style.css' ],
      scripts: [ cdn.js.jquery, 'js/alerts.js', 'js/users.js' ]
    } 
  )
}

module.exports = {
  landing,
  login,
  register
}