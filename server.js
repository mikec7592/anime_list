// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Anime = require('./models/anime')
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
    ], (err, data) => {
      res.redirect('/animeList')
    }
    )
})


// INDEX
  APP.get('/animeList', (req, res) => {
    Anime.find({}, (error, anime) => {
      res.render('index.ejs', {
        anime: anime
      })
    })
})

// NEW 
APP.get('/animeList/new', (req, res) => {
  res.render('new.ejs')
})

// CREATE
APP.post('/animeList', (req, res) => {
  if (req.body.completed === 'on') {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  if (req.body.planToWatch === 'on') {
    req.body.planToWatch = true;
  } else {
    req.body.planToWatch = false;
  }
  Anime.create(req.body, (error, anime) => {
    res.redirect('/animeList')
  })
})


// SHOW
APP.get('/animeList/:id', (req, res) => {
  res.send('this is the show')
})



APP.delete('/animeList/:id', (req, res) => {
  Anime.findByIdAndDelete(req.params.id, (error, anime) => {
    res.redirect('/animeList')
  })
})

// EDIT
APP.get('/animeList/:id/edit', (req, res) => {
  Anime.findById(req.params.id, (error, anime) => {
    res.render('edit.ejs', {
      anime: anime
    })
  })
})


// UPDATE
APP.put('/animeList/:id', (req, res) => {
  if (req.body.completed === 'on') {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  if (req.body.planToWatch === 'on') {
    req.body.planToWatch = true;
  } else {
    req.body.planToWatch = false;
  }
  Anime.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, anime) => {
    res.redirect('/animeList')
  })
})

  
// Listener
  APP.listen(PORT, () => {
    console.log('Listening on port', PORT)
  })
  