// 'use strict'

var async = require('async');

module.exports = function (app, passport, auth) {
    var users = require('../app/controllers/users');

    app.get('/signin', users.signin);

    var index = require('../app/controllers/index');

    app.get('/', index.render);
};