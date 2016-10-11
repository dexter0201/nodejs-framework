(function () {
    'use strict';

    var fs = require('fs'),
        express = require('express'),
        appPath = process.cwd(),
        dexter = require('nodejscore');

    module.exports = function (passport, db) {
        var app;

        bootstrapModels();
        require(appPath + '/config/passport')(passport);
        bootstrapDependencies();
        // Express settings
        app = express();
        require(appPath + '/config/express')(app, passport, db);
        bootstrapRoutes();

        function bootstrapModels() {
            var models_path = appPath + '/app/models';
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

        function bootstrapDependencies() {
            dexter.register('passport', function () {
                return passport;
            });
            dexter.register('auth', function () {
                return require(appPath + '/app/routes/middlewares/authorization');
            });
            dexter.register('database', {
                connection: db
            });
            dexter.register('app', function () {
                return app;
            });
        }

        function bootstrapRoutes() {
            var routes_path = appPath + '/app/routes';
            var walk = function (path) {
                console.log('...bootstrap routes...: ', path);
                fs.readdirSync(path).forEach(function (file) {
                    var newPath = path + '/' + file;
                    var stats = fs.statSync(newPath);

                    if (stats.isFile()) {
                        if (/(.*)\.(js$|coffee$)/.test(file)) {
                            require(newPath)(app, passport);
                        }
                    } else if (stats.isDirectory() && file !== 'middlewares') {
                        walk(newPath);
                    }
                });
            };

            walk(routes_path);
        }

        return app;
    };
}());