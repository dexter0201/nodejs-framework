var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

// bootstrap db connection
mongoose.connect(config.db);

// bootstrap models
var models_path = __dirname + '/app/models';

var walk = function (path) {
    fs.readdirSync(path).forEach(function (file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);

        if (stat.isFile() &&
            /(.*)\.(js|coffee)/.test(file)) {
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

// Express setting
require('./config/express')(app, passport);

// Bootstrap routers
require('./config/routes')(app, passport, auth);

// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port: ' + port);

// Initialazing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;