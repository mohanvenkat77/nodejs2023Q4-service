const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  grammy: { type: Boolean, required: true },
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
