const Favorite = require('../models/favorite.model');
const Article = require('../models/article.model');
const mongoose = require('mongoose')

exports.get = function (req, res, next) {
    Favorite.find({})
        .populate('article')
        .exec(function (err, favorites) {
            if (err) return next(err)
            res.send(favorites)
        })
}

exports.create = function (req, res, next) {
    const favorite = new Favorite(
        {
            article: mongoose.Types.ObjectId(req.body.article_id)
        }
    )

    favorite.save(function (err, favorite) {
        if (err) {
            return next(err);
        }
        Favorite.populate(favorite, { path: "article" }, function (err, favorite) {
            if (err) {
                return next(err);
            }
            res.send(favorite)
        })
    })
}

exports.delete = function (req, res, next) {
    Favorite.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            return next(err);
        }
        res.send()
    })
}

exports.deleteMultiple = function (req, res, next) {
    Favorite.deleteMany(
        { _id: { $in: req.body.ids } }, function (err) {
            if (err) {
                return next(err);
            }
            res.send()
        })
}