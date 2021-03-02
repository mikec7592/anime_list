const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    img: String,
    completed: Boolean,
    planToWatch: Boolean,
    rating: {type: Number, min: [0], max: [10],}
})

const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime