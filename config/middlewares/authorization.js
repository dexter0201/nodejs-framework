//'use strict';

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    }

    next();
};