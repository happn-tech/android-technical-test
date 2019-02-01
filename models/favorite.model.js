const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FavoriteSchema = new Schema({
    guid: { type: String, required: true, index: { unique: true } }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);