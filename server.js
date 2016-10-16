(function () {
    'use strict';

    /**
     * Mean container for dependency injection
     */
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

    var config = require('./server/config/config');
    var mongoose = require('mongoose');
    var db = mongoose.connect(config.db);
    var app = require('./server/config/system/bootstrap')(passport, db);

    app.listen(config.port);

    dexter.resolve('one', function (one) {
        one.echo('Express app started on port: ' + config.port);
    });

    logger.init(app, passport, mongoose);

    exports = module.exports = app;
}());