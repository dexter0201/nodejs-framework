(function () {
    'use strict';

    var fs = require('fs'),
        express = require('express'),
        appPath = process.cwd();

    module.exports = function (dexter, passport, db) {
        var app;

        bootstrapModels();
        require(appPath + '/config/passport')(passport);
        bootstrapDependencies();
        // Express settings
        app = express();
        require(appPath + '/config/express')(dexter, app, passport, db);
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
            dexter.register('events', function () {
                return dexter.events;
            });
            dexter.register('middleware', function () {
                var middleware = {};

                middleware.add = function (event, weight, func) {
                    dexter.middleware[event].splice(weight, 0, {
                        weight: weight,
                        func: func
                    });
                    dexter.middleware[event].join();
                    dexter.middleware[event].sort(function (a, b) {
                        if (a.weight < b.weight) {
                            a.next = b.func;
                        } else {
                            b.next = a.func;
                        }

                        return (a.weight - b.weight);
                    });
                };

                middleware.before = function (req, res, next) {
                        if (!dexter.middleware.length) {
                            return next();
                        }

                        chain('before', 0, req, res, next);
                    };

                    middleware.after = function (req, res, next) {
                        if (!dexter.middleware.length) {
                            return next();
                        }

                        chain('after', 0, req, res, next);
                    };

                    function chain(operator, index, req, res, next) {
                        var args = [
                            req,
                            res,
                            function (err) {
                                if (dexter.middleware[operator][index + 1]) {
                                    chain('before', index + 1, req, res, next);
                                } else {
                                    next();
                                }
                            }
                        ];

                        dexter.middleware[operator][index].func.apply(this, args);
                    }

                return middleware;
            });
            dexter.register('modules', function (app, auth, database, events, middleware) {
                require(appPath + '/config/system/modules')(dexter, app, auth, database, events, middleware);
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