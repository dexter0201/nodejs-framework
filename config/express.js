//'use strict';

var express = require('express'),
    helpers = require('view-helpers'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    config = require('./config');

module.exports = function (app, passport, db) {
    app.set('showStackError', true);
    //app.local.pretty = true;

    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use(express.favicon());
    app.use(express.static(config.root + '/public'));

    if (process.env.ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    // Set view path, template, engine, default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    app.enable('jsonp callback');

    app.configure(function () {
        app.use(express.cookieParser());
        //app.use(express.bodyParser());
        app.use(express.urlencoded());
        app.use(express.methodOverride());

        app.use(express.session({
            secret: 'KALEL',
            store: new mongoStore({
                //db: db.connection.db,
                url: config.db,
                collection : 'sessions'
            })
        }));

        // connect flash for flash message
        app.use(flash());

        // dynamic helpers
        app.use(helpers(config.app.name));

        // express session
        app.use(passport.initialize());
        app.use(passport.session());

        // routes should be at the last
        app.use(app.router);

        app.use(function (err, req, res, next) {
            if (~err.message.indexOf('not found')) {
                return next();
            }

            // log it
            console.error(err.stack);

            // error page
            res.status(500).render('500', { error: err.stack });
        });

        // assume 404 since no middleware responded
        app.use(function(req, res, next){
            res.status(404).render('404', { url: req.originalUrl, error: 'Not found' })
        });
    });
};