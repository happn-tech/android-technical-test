const Favorite = require('../models/favorite.model');
const Article = require('../models/article.model');

exports.get = function (req, res, next) {
    Favorite.find(function (err, favorites) {
        if (err) return next(err);
        Article.find({
            'guid': {
                $in: [
                    favorites.map(it => it.guid)
                ]
            }
        }, function (err, articles) {
            if (err) return next(err);
            res.send(articles);
        })
    })
};

exports.create = function (req, res, next) {
    const favorite = new Favorite(
        {
            guid: req.body.guid
        }
    );

    favorite.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(favorite)
    })
};

exports.delete = function (req, res, next) {
    Favorite.deleteOne({ guid: req.params.guid }, function (err) {
        if (err) {
            return next(err);
        }
        res.send()
    })
};
