const mongoose = require('mongoose')
const Schema = mongoose.Schema

let FavoriteSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true }
})

module.exports = mongoose.model('Favorite', FavoriteSchema)