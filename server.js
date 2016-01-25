var express = require('express'),
    fs = require('fs'),
    passport = require('passport');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
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
require('./config/passport')(passport, config);


// Express
var app = express();

// Express setting
require('./config/express')(app, config, passport);

