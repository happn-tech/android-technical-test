const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
    title: { type: String, required: true },
    pubDate: { type: Date, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    guid: { type: String, required: true, index: { unique: true } },
    author: { type: String, required: true },
    content: { type: String, required: false },
    categories: { type: Array, required: false },
    thumbnail: { type: String }
})

module.exports = mongoose.model('Article', ArticleSchema)