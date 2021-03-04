const express = require('express')
const ROUTER = express.Router()
const Anime = require('../models/anime.js')

// *********   ROUTES    ***********

// seed
ROUTER.get('/seed', (req, res) => {
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

// ***********  INDEX  **********
ROUTER.get('/', (req, res) => {
    Anime.find({}, (error, anime) => {
      res.render('./anime/index.ejs', {
        anime: anime,
        currentUser:req.session.currentUser
      })
    })
})

// ******** NEW ********
ROUTER.get('/new', (req, res) => {
    res.render('./anime/new.ejs', {
        currentUser: req.session.currentUser
    })
  })

  // ******** CREATE ********
ROUTER.post('/', (req, res) => {
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

  // ********* SHOW *********
ROUTER.get('/:id', (req, res) => {
    Anime.findById(req.params.id, (error, anime) => {
      res.render('./anime/show.ejs', {
        anime: anime,
        currentUser: req.session.currentUser
      })
    })
  })

// ****** FAVORITES ********
ROUTER.get('/favorites', (req, res) => {
    if (req.session.currentUser) {
      Anime.find({}, (error, anime) => {
        res.render('./anime/favorites.ejs', {
          anime: anime,
          currentUser: req.session.currentUser
        })
      })
    } else {
      res.redirect('/sessions/new')
    }
  })


// ******** DELETE ********
ROUTER.delete('/:id', (req, res) => {
    Anime.findByIdAndDelete(req.params.id, (error, anime) => {
      res.redirect('/animeList')
    })
  })
  

  // ****** EDIT ********
ROUTER.get('/:id/edit', (req, res) => {
    Anime.findById(req.params.id, (error, anime) => {
      res.render('./anime/edit.ejs', {
        anime: anime,
        currentUser: req.session.currentUser
      })
    })
  })


  // ******* UPDATE *******
ROUTER.put('/:id', (req, res) => {
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

module.exports = ROUTER