const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  artistId: { type: String, required: false, ref: 'Artist' },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
