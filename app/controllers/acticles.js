var mongoose = require('mongoose'),
    Acticle = mongoose.model('Acticle'),
    _ = require('underscore');

exports.acticle = function (req, res, next, id) {
    var User = mongoose.model('User');
    
    Acticle.load(id, function (err, acticle) {
        if (err) {
            return next(err);
        }
        
        if (!acticle) {
            return next(new Error('Failed to load article ' + id));
        }
        
        req.acticle = acticle;
        next();
    });
};

exports.create = function (req, res) {
    var article = new Acticle(req.body);
    
    article.user = req.user;
    article.save();
    res.jsonp(article);
};

exports.update = function (req, res) {
    var article = req.article;
    
    article = _.extend(article, req.body);
    
    article.save(function (err) {
        res.jsonp(article);
    });
};

exports.destroy = function (req, res) {
    var article = req.acticle;
    
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
    Acticle
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
