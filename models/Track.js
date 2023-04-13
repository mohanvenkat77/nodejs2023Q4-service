const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  artistId: { type: String, required: false, ref: 'Artist' },
  albumId: { type: String, required: false, ref: 'Album' },
  duration: { type: Number, required: true },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
