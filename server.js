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
        passport = require('passport'),
        logger = require('mean-logger');

    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        config = require('./config/config'),
        mongoose = require('mongoose');

    var db = mongoose.connect(config.db);
    var app = require('./config/system/bootstrap')(dexter, passport, db);

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