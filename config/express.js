//'use strict';

var helpers = require('view-helpers'),
    consolidate = require('consolidate'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    assetmanager = require('assetmanager'),
    dexter = require('nodejscore'),
    config = dexter.loadConfig(),
    path = require('path');

module.exports = function (app, passport, db) {
    app.locals.title = 'Dexter\'s application';
    app.set('showStackError', true);

    // pretty HTML
    app.locals.pretty = true;
    // cache=memory or swig die in NODE_ENV=production
    app.locals.cache = 'memory';

    app.use(compression({
        level: 9
    }));

    if (process.env.ENV !== 'test') {
        app.use(morgan('dev'));
    }

    // Assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');

    app.enable('jsonp callback');

    app.use(cookieParser());
    app.use(expressValidator());
    app.use(bodyParser());
    app.use(methodOverride());

    assetmanager.process({
        assets: require('./assets.json'),
        webroot: 'public/public',
        debug: process.env.NODE_ENV !== 'production'
    });
    // Add assets to local veriables
    app.use(function (req, res, next) {
        res.locals.assets = assetmanager.assets;
        next();
    });

    app.use(session({
        secret: config.sessionSecret,
        store: new mongoStore({
            //db: db.connection.db,
            url: config.db,
            collection : config.sessionController
        }),
        cookie: config.sessionCookie,
        name: config.sessionName
    }));


    // dynamic helpers
    app.use(helpers(config.app.name));

    // express session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(dexter.chainware.before);

    // connect flash for flash message
    app.use(flash());
};