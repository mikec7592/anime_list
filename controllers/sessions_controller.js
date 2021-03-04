const bcrypt = require('bcrypt')
const express = require('express')
const ROUTER = express.Router()
const User = require('../models/users.js')


ROUTER.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
  })
  
  
  ROUTER.post('/', (req, res) => {
    
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) {
        console.log(err)
        res.send('oops the db had a problem')
      } else if (!foundUser) {
        res.send('<a  href="/">Sorry, no user found </a>')
      } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser
          res.redirect('/animeList')
        } else {
          res.send('<a href="/"> password does not match </a>')
        }
      }
    })
  })
  
  ROUTER.delete('/', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/animeList')
    })
  })

  
  
  module.exports = ROUTER