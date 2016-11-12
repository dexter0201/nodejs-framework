'use strict';

module.exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports.requiresAdmin = function (req, res, next) {
    if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
        return res.status(401).send('User is not authorized');
    }

    next();
};