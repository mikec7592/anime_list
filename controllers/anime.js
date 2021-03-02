const express = require('express')
const ROUTER = express.Router()
const Anime = require('../models/anime.js')

// *********   ROUTES    ***********

// seed
ROUTER.get('seed')