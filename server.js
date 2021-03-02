// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcrypt')

// CONFIGURATION
require('dotenv').config()
const APP = express()
const DB = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// MIDDLEWARE
APP.use(methodOverride('_method'))
APP.use(express.urlencoded({ extended: true }))
// app.use(
//   session({
//     secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
//     resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
//     saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
//   })
// )


// DATABASE
mongoose.connect(
    mongodbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
    () => {
      console.log('the connection with mongod is established at', mongodbURI)
    }
  )
  
  // Optional, but likely helpful
  // Connection Error/Success
  // Define callback functions for various events
  DB.on('error', err => console.log(err.message + ' is mongod not running?'))
  DB.on('disconnected', () => console.log('mongo disconnected'))
  
  Controllers
  const animeController = require('./controllers/anime.js')
  APP.use('/animeList', animeController)
  
  // const userController = require('./controllers/')
  // app.use('/users', userController)
  
  // const sessionsController = require('./controllers/sessions_controller.js')
  // app.use('/sessions', sessionsController)
  
  
  // Listener
  APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
  })
  