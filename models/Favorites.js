const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  artists: [{ type: String }],
  albums: [{ type: String }],
  tracks: [{ type: String }],
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites;
