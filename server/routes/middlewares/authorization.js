'use strict';

module.exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports.requiresAdmin = function () {
    return true;
};