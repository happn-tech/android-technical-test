const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
    title: { type: String, required: true },
    pubDate: { type: Date, required: true },
    link: { type: String, required: true },
    guid: { type: String, required: true, index: { unique: true } },
    author: { type: String, required: true },
    thumbnail: { type: String }
})

module.exports = mongoose.model('Article', ArticleSchema)