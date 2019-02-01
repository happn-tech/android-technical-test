const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

/* Articles API */

const articlesDb = require('./db/articles.json')
const articlesUrl = '/articles'

app.get(articlesUrl, (req, res) => res.send(articlesDb))

/* Favorites API */

const favoritesDb = require('./db/favorites.json')
const favoritesUrl = '/favorites'

app.get(favoriteUrl, (req, res) => res.send(favorites))
app.post(favoritesUrl, function(req, res) {
    const guid = req.body.guid    
    if (guid != undefined && guid != "" && !favoritesDb.includes(guid)){
        favoritesDb.push(guid)
    } 
    res.send(favoritesDb)
})
app.delete(favoritesUrl, function (req, res) {
    const guid = req.body.guid  
    favoritesDb.splice(favoritesDb.indexOf(guid),1)
    res.send(favoritesDb)
})

app.listen(port, () => console.log(`Android Technical Test listening on port ${port}!`))