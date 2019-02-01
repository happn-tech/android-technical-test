const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const Article = require('./models/article.model')
const articles = require('./routes/article.route');
const favorites = require('./routes/favorite.route');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/android-technical-test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
    useCreateIndex: true,
    useNewUrlParser: true
}, function () {
    mongoose.connection.db.dropDatabase()
    Article.insertMany(require('./db/articles.json'))
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use("/articles", articles)
app.use("/favorites", favorites)
app.listen(port, () => console.log(`Android Technical Test listening on port ${port}!`))