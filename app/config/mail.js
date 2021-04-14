"use strict"

require('dotenv').config()
const nodemailer = require("nodemailer")
const Mustache = require('mustache')
const path = require('path')
const fs = require('fs')

async function sendmail(to, subject, body){
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS, 
    },
  })
  try{
    let info = await transporter.sendMail({
      from: '"Info nodesite 👻" <'+process.env.SMTP_USER+'>', 
      to: to, 
      subject: subject,
      html: body,
    })
    console.log("Message sent: %s", info.messageId)  
  }catch(err){
    console.log(err.response)
  }
}

function useTemplate(to, subject, obj, template){
  fs.readFile(path.join(__dirname, '../views/email/'+template+'.html'), function (err, data) {
    if (err) throw err
    let output = Mustache.render(data.toString(), obj)
    sendmail(to, subject, output).catch(console.log('send'))
  })
}

module.exports ={
  sendmail,
  useTemplate
}

