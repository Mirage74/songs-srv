const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
mongoose.plugin(beautifyUnique)

const songSchema = new mongoose.Schema({
  artist: String,
  genre: String,
  year: Number,
  title: String,
  durationMin: Number, 
  durationSec: Number, 
  contents: String
}, {
  timestamps: false
})


songSchema.statics.publicFields = ['artist', 'genre', 'year', 'title', 'durationMin', 'durationSec', 'contents']
const songModel = mongoose.model('Song', songSchema)
module.exports = songModel
