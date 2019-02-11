const Favorite = require('../models/favorite.model')
const Article = require('../models/article.model')
const NetworkUtils = require('../utils/network')
const mongoose = require('mongoose')

exports.get = function (req, res, next) {
    Favorite.find()
        .populate('article')
        .exec(function (err, favorites) {
            if (err) { return next(err) }
            res.send(favorites)
        })
}

exports.create = function (req, res, next) {
    const article_id = req.body.article_id

    if (!article_id){
        return NetworkUtils.missingParameters(res, ['article_id'])   
    }

    Article.findOne({ _id: article_id }, function (err, article) {
        if (err) { return next(err) }
        if (!article) {
            return NetworkUtils.sendError(res, 'No article found with id ' + article_id, 404)
        }

        Favorite.findOne({ article: article._id }, function (err, result) {
            if (err) { return next(err) }
            if (result) {
                return NetworkUtils.sendError(res, 'Favorite for this article already exist with id ' + result.id, 409)
            }
            const favorite = new Favorite({ article: article_id })
            favorite.save(function (err, favorite) {
                Favorite.populate(favorite, { path: "article" }, function (err, favorite) {
                    if (err) { return next(err) }
                    favorite.article.update({ favorite_id: favorite._id }, function (err, _) {
                        if (err) {
                            return next(err)
                        }
                        res.send(favorite)
                    })
                })
            })
        })
    })
}

exports.delete = function (req, res, next) {
    const favorite_id = req.params.id

    if (!favorite_id) {
        return NetworkUtils.missingParameters(res, ['id'])
    }

    Favorite.findOne({ _id: favorite_id })
        .populate('article')
        .exec(function (err, favorite) {
            if (err) { return next(err) }
            if (!favorite) {
                return NetworkUtils.sendError(res, 'No favorite found with id ' + favorite_id, 404)
            }

            favorite.article.update({ favorite_id: null }, function (err, _) {
                if (err) { return next(err) }
                Favorite.deleteOne({ _id: favorite_id }, function (err) {
                    if (err) { return next(err) }
                    res.send({})
                })
            })
        })
}

exports.deleteMultiple = function (req, res, next) {
    const favorite_ids = req.body.ids

    if (!favorite_ids) {
        return NetworkUtils.missingParameters(res, ['ids'])
    }

    Favorite.find({ _id: { $in: favorite_ids } })
        .populate('article')
        .exec(function (err, favorites) {
            if (err) { return next(err) }
            var favorite_not_found_ids = favorite_ids.slice(0)

            favorites.forEach(favorite => {
                if (favorite_ids.indexOf(favorite._id) == -1) {
                    favorite_not_found_ids.splice(favorite._id, 1)
                }
            })
            if (favorite_not_found_ids.length != 0) {
                return NetworkUtils.sendError(res, 'No favorite found for ids [' + favorite_not_found_ids + ']', 404)
            }

            const article_ids = favorites.map(it => it.article._id)
            Article.updateMany(
                { _id: { $in: article_ids } },
                { $set: { favorite_id: null } },
                function (err, _) {
                    if (err) { return next(err) }
                    Favorite.deleteMany({ _id: favorite_ids }, function (err, _) {
                        if (err) { next(err) }
                        res.send({})
                    })
                }
            )
        })
}