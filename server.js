(function () {
    'use strict';

    /**
     * Container for dependency injection
     */
    var dexter = require('nodejscore');
    var passport = require('passport');
    var config = require('./server/config/config');
    var mongoose = require('mongoose');
    var db = mongoose.connect(config.db);
    var app = {};

    dexter.app('Dexter\'s NodeJs Framework', {});

    dexter.register('one', function () {
        return {
            echo: function (text) {
                console.log(text);
            }
        };
    });

    app = require('./server/config/system/bootstrap')(passport, db);
    app.listen(config.port);

    dexter.resolve('one', function (one) {
        one.echo('Express app started on port: ' + config.port);
    });

    exports = module.exports = app;
}());