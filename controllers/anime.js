const { Router } = require('express')
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
    res.send('greetings this is homebase')
})




module.exports = ROUTER