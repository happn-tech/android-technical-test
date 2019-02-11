const Favorite = require('../models/favorite.model')
const Article = require('../models/article.model')
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
            return next(err)
        }
        Favorite.populate(favorite, { path: "article" }, function (err, favorite) {
            if (err) {
                return next(err)
            }
            favorite.article.update({ favorite_id: favorite._id }, function (err, _) {
                if (err) {
                    return next(err)
                }
                res.send(favorite)
            })
        })
    })
}

exports.delete = function (req, res, next) {
    Favorite.findOne({ _id: req.params.id })
        .populate('article')
        .exec(function (err, favorite) {
            if (err) {
                return next(err)
            }
            favorite.article.update({ favorite_id: null }, function (err, _) {
                if (err) {
                    return next(err);
                }
                Favorite.deleteOne({ _id: req.params.id }, function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.send({})
                })
            })
        })
}

exports.deleteMultiple = function (req, res, next) {
    Favorite.find({ _id: { $in: req.body.ids } })
        .populate('article')
        .exec(function (err, favorites) {
            var articleIds = favorites.map(it => it.article._id)
            Article.updateMany(
                { _id: { $in: articleIds } },
                { $set: { favorite_id: null } },
                function (err, _) {
                    if (err) {
                        next(err)
                    }
                    Favorite.deleteMany({ _id: req.body.ids }, function (err, _) {
                        if (err) {
                            next(err)
                        }
                        res.send({})
                    })
                }
            )
        })
}