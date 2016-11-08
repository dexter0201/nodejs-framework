(function () {
    'use strict';

    var express = require('express');
    var appPath = process.cwd();
    var dexter = require('nodejscore');

    module.exports = function (passport, db) {
        var app;

        bootstrapModels();
        require(appPath + '/server/config/passport')(passport);
        bootstrapDependencies(db);

        app = express();
        require(appPath + '/server/config/express')(app, passport, db);

        return app;
    };

    /**
     * Private section
     */

    function bootstrapModels() {
        require('../util').walk(appPath + '/server/models', null, function (file) {
            require(file);
        });
    }

    function bootstrapDependencies(db) {
        dexter.register('passport', function (passport) {
            return passport;
        });
        dexter.register('auth', function () {
            return require(appPath + '/server/routes/middlewares/authorization');
        });
        dexter.register('database', {
            connection: db
        });
        dexter.register('app', function (app) {
            return app;
        });
    }
}());