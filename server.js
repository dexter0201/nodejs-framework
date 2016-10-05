'use strict';

/**
 * Mean container for dependency injection
 */
var dependable = require('dependable');
var dexter = module.exports.dexter = dependable.container();

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

// Register passport dependency
dexter.register('passport', function () {
    return passport;
});

// Register auth dependency
dexter.register('auth', function () {
    return require('./app/routers/middlewares/authorization');
});

// Register database dependency
dexter.register('database', {
    connection: db
});

// Register app dependency
dexter.register('app', function () {
    return app;
});

// Initialize the modules
// @TODO: adding

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

// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port: ' + port);

// Initialazing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
