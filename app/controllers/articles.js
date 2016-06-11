var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('underscore');

exports.article = function (req, res, next, id) {
    Article.load(id, function (err, article) {
        if (err) {
            return next(err);
        }

        if (!article) {
            return next(new Error('Failed to load article ' + id));
        }

        req.article = article;
        next();
    });
};

exports.create = function (req, res) {
    var article = new Article(req.body);

    article.user = req.user;

    article.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

exports.update = function (req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function (err) {
        res.jsonp(article);
    });
};

exports.destroy = function (req, res) {
    var article = req.Article;

    article.remove(function (err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        }

        res.jsonp(article);
    });
};

exports.show = function (req, res) {
    res.jsonp(req.article);
};

exports.all = function (req, res) {
    Article
        .find()
        .sort('-created')
        .populate('user')
        .exec(function (err, articles) {
            if (err) {
                res.render('error', { status: 500 });
            } else {
                res.jsonp(articles);
            }
        });
};
