'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash');

module.exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

module.exports.requiresAdmin = function (req, res, next) {
    if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
        return res.status(401).send('User is not authorized');
    }

    next();
};

/**
 * Generic validates if the first parameter is a mongo ObjectId
 */
module.exports.isMongoId = function(req, res, next) {
    if ((_.size(req.params) === 1) && (!mongoose.Types.ObjectId.isValid(_.values(req.params)[0]))) {
        return res.status(500).send('Parameter passed is not a valid Mongo ObjectId');
    }

    next();
};