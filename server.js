(function () {
    'use strict';

    /**
     * Mean container for dependency injection
     */
    //var dependable = require('dependable');
    //var dexter = module.exports.dexter = dependable.container();
    //var nodejsIocContainer = require('nodejs-ioc-container');
    //var dexter = module.exports.dexter = nodejsIocContainer.container();
    //var EventEmitter = require('events').EventEmitter;
    //dexter.events = new EventEmitter();
    var dexter = require('nodejscore');
    var passport = require('passport');
    var logger = require('mean-logger');

    dexter.app('Dexter\'s NodeJs Framework', {

    });

    dexter.register('one', function () {
        return {
            echo: function (text) {
                console.log(text);
            }
        };
    });

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var config = require('./server/config/config');
    var mongoose = require('mongoose');
    var db = mongoose.connect(config.db);
    var app = require('./server/config/system/bootstrap')(passport, db);
    var port = process.env.PORT || config.port;

    app.listen(port);

    dexter.resolve('one', function (one) {
        one.echo('Express app started on port: ' + port);
    });

    logger.init(app, passport, mongoose);

    exports = module.exports = app;
}());