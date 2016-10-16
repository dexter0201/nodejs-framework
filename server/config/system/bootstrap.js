(function () {
    'use strict';

    var fs = require('fs');
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
        var models_path = appPath + '/server/models';
        var walk = function (path) {
            fs.readdirSync(path).forEach(function (file) {
                var newPath = path + '/' + file;
                var stats = fs.statSync(newPath);

                if (stats.isFile()) {
                    if (/(.*)\.(js$|coffee$)/.test(file)) {
                        require(newPath);
                    }
                } else if (stats.isDirectory()) {
                    walk(newPath);
                }
            });
        };

        walk(models_path);
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