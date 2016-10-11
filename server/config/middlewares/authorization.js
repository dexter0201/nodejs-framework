//'use strict';

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401, 'User is not authoried');
    }

    next();
};

exports.user = {
    hasAuthorization: function (req, res, next) {
        if (req.profile.id != req.user.id) {
            res.send(401, 'User is not authoried');
        }
        next();
    }
};

exports.article = {
    hasAuthorization: function (req, res, next) {
        if (req.article.user.id != req.user.id) {
            res.send(401, 'User is not authoried');
        }
        next();
    }
};