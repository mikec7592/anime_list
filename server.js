// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
// const session = require('express-session')
// const bcrypt = require('bcrypt')

// CONFIGURATION
// require('dotenv').config()
const APP = express()
const DB = mongoose.connection
const PORT = 3000
const mongodbURI = 'mongodb://localhost:27017/anime_list'

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
  
  // Controllers
  // const animeController = require('./controllers/anime.js')
  // APP.use('/animeList', animeController)
  
  // ******* ROUTES ********
  

  // SEED
  APP.get('/seed', (req, res) => {
    Anime.create([
        {
            title: 'Naruto',
            description: 'Lituations galore',
            img: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY1200_CR93,0,630,1200_AL_.jpg',
            completed: true,
            planToWatch: false,
            rating: 8
        },
        {
            title: 'Dragon Ball Z',
            description: 'get stronk, collect balls, die, win and repeat',
            img: 'https://cdn.myanimelist.net/images/anime/6/20936.jpg',
            completed: true,
            planToWatch: true,
            rating: 6
        },
        {
            title: 'test test',
            description: 'i have never seen this before wow',
            img: 'https://www.sciencenewsforstudents.org/wp-content/uploads/2019/11/860_main_questions_CJdirt_0.gif',
            completed: false,
            planToWatch: true,
        }
    ])
})


// INDEX
  APP.get('/animeList', (req, res) => {
    res.render()
})

// NEW 
APP.get('/animeList/new', (req, res) => {
  res.send('this is new')
})

// CREATE


// SHOW
APP.get('/animeList/:id', (req, res) => {
  res.send('this is the show')
})

// DELETE



// EDIT



// UPDATE


  
// Listener
  APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
  })
  