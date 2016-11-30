'use strict';

var express = require('express'),
    appPath = process.cwd(),
    dexter = require('nodejscore');

module.exports = function (passport, db) {
    var app;

    require(appPath + '/config/passport')(passport);

    app = express();
    require(appPath + '/config/express')(app, passport, db);

    require('../util').walk(appPath + '/server', 'models', null, function (file) {
        require(file);
    });

    bootstrapDependencies();

    function bootstrapDependencies() {
        dexter.register('passport', function () {
            return passport;
        });
        dexter.register('auth', function () {
            return require(appPath + '/server/routes/middlewares/authorization');
        });
        dexter.register('database', {
            connection: db
        });
        dexter.register('app', function () {
            return app;
        });
    }

    return app;
};
