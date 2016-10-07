(function () {
    'use strict';

    /**
     * Mean container for dependency injection
     */
    var dependable = require('dependable');
    var dexter = module.exports.dexter = dependable.container();
    var EventEmitter = require('events').EventEmitter;

    dexter.events = new EventEmitter();

    var express = require('express'),
        fs = require('fs'),
        passport = require('passport'),
        logger = require('mean-logger');

    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        config = require('./config/config'),
        mongoose = require('mongoose');

    // bootstrap db connection
    var db = mongoose.connect(config.db);

    // bootstrap models
    var models_path = __dirname + '/app/models';

    var walk = function (path) {
        fs.readdirSync(path).forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile() &&
                /(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            } else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
    };

    walk(models_path);

    // bootstrap passport config
    require('./config/passport')(passport);

    // Express
    var app = express();

    /**
     * Dependable register module
     */
    // Register passport dependency
    dexter.register('passport', function () {
        return passport;
    });

    // Register auth dependency
    dexter.register('auth', function () {
        return require('./app/routes/middlewares/authorization');
    });

    // Register database dependency
    dexter.register('database', {
        connection: db
    });

    // Register app dependency
    dexter.register('app', function () {
        return app;
    });

    dexter.register('events', function () {
        return dexter.events;
    });

    dexter.register('middleware', function (app) {
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
        require('./config/system/modules')(dexter, app, auth, database, events, middleware);
    });

    /**
     * @END: Dependable register modules
     */

    // Express setting
    require('./config/express')(app, passport, db);

    // Bootstrap routers
    var routes_path = './app/routes';
    var walk2 = function (path) {
        fs.readdirSync(path).forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile() &&
                /(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            } else if (stat.isDirectory() &&
                file != 'middlewares') {
                walk2(newPath);
            }
        });
    };

    walk2(routes_path);
    dexter.resolve({}, function (modules) {

    });

    // Start the app by listening on <port>
    var port = process.env.PORT || config.port;
    app.listen(port);
    console.log('Express app started on port: ' + port);

    // Initialazing logger
    logger.init(app, passport, mongoose);

    // Expose app
    exports = module.exports = app;
}());