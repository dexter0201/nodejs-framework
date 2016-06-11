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

fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});

// bootstrap passport config
require('./config/passport')(passport);

// Express
var app = express();

// Express setting
require('./config/express')(app, passport);

// Bootstrap routers
require('./config/routes')(app, passport, auth);

// Start the app by listening on <port>
var port = config.port;
app.listen(port);
console.log('Express app started on port: ' + port);

// Initialazing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;