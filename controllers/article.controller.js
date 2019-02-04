const Article = require('../models/article.model');

exports.get = function (req, res) {

    const author = req.query.author

    if (!author) {
        Article.find(function (err, articles) {
            if (err) return next(err);
            res.send(articles);
        })
    }
    else {
        Article.find({ author: author }, function (err, articles) {
            if (err) return next(err);
            res.send(articles);
        });
    }
};

exports.create = function (req, res, next) {
    const article = new Article(
        {
            title: req.body.title,
            pubDate: req.body.pubDate,
            link: req.body.link,
            pudDate: req.body.pubDate,
            guid: req.body.guid,
            author: req.body.author,
            thumbnail: req.body.thumbnail
        }
    );

    article.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(article)
    })
};