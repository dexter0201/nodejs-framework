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
    nodejscore = require('nodejscore'),
    config = nodejscore.loadConfig();

function onAggregatedSrc(position, ext, res, next, data) {
    res.locals.aggregatedAssets[position][ext] = data;
    next && next();
}

module.exports = function (app, passport/*, db*/) {
    var i;

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

    app.use(cookieParser());
    app.use(expressValidator());
    app.use(bodyParser());
    app.use(methodOverride());

    assetmanager.process({
        assets: require('./assets.json'),
        webroot: 'public/public',
        debug: process.env.NODE_ENV !== 'production'
    });

    for (i in assetmanager.assets.core.css) {
        nodejscore.aggregate(
            'css',
            assetmanager.assets.core.css[i],
            {
                group: 'header',
                singleFile: true
            },
            nodejscore.config.clean
        );
    }

    for (i in assetmanager.assets.core.js) {
        nodejscore.aggregate(
            'js',
            assetmanager.assets.core.js[i],
            {
                group: 'footer',
                singleFile: true,
                global: true,
                weight: -1000000 + i
            },
            nodejscore.config.clean
        );
    }

    // Add assets to local veriables
    app.use(function (req, res, next) {
        res.locals.aggregatedAssets = {
            header: {},
            footer: {}
        };

        nodejscore.aggregatedSrc('css', 'header', onAggregatedSrc.bind(null, 'header', 'css', res, null));
        nodejscore.aggregatedSrc('js', 'header', onAggregatedSrc.bind(null, 'header', 'js', res, null));
        nodejscore.aggregatedSrc('css', 'footer', onAggregatedSrc.bind(null, 'footer', 'css', res, null));
        nodejscore.aggregatedSrc('js', 'footer', onAggregatedSrc.bind(null, 'footer', 'js', res, next));
    });

    app.use(session({
        secret: config.sessionSecret,
        store: new mongoStore({
            //db: db.connection.db,
            url: config.db,
            collection : config.sessionController
        }),
        cookie: config.sessionCookie,
        name: config.sessionName,
        resave: true,
        saveUninitialized: true
    }));


    // dynamic helpers
    app.use(helpers(config.app.name));

    // express session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(nodejscore.chainware.before);

    // connect flash for flash message
    app.use(flash());
};