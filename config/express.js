//'use strict';

var express = require('express'),
    helpers = require('view-helpers'),
    consolidate = require('consolidate'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHander = require('errorhandler'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    assetmanager = require('assetmanager'),
    dexter = require('nodejscore'),
    config = dexter.loadConfig(),
    util = require('./util'),
    appPath = process.cwd(),
    fs = require('fs'),
    Grid = require('gridfs-stream'),
    path = require('path');

module.exports = function (app, passport, db) {
    var gfs = new Grid(db.connection.db, db.mongo);

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

    // Set view path, template, engine, default layout
    app.set('views', config.root + '/server/views');
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

    app.use(favicon());
    app.use('/public', express.static(config.root + '/public'));

    app.get('/modules/aggregated.js', function (req, res) {
        res.setHeader('content-type', 'text/javascript');
        res.send(dexter.aggregated.js);
    });

    app.get('/theme.css', function (req, res) {
        res.setHeader('content-type', 'text/css');
        gfs.files.findOne({
            filename: 'theme.css'
        }, function (err, file) {
            if (!file) {
                fs.createReadStream(
                    path.join(process.cwd(), 'public/system/lib/bootstrap/css/bootstrap.css')
                ).pipe(res);
            } else {
                var readStream = gfs.createReadStream({
                    filename: 'theme.css'
                });

                readStream.on('error', function (err) {
                    console.log('An error occurred!', err.message);
                });

                readStream.pipe(res);
            }
        });

    });

    app.get('/modules/aggregated.css', function (req, res) {
        res.setHeader('content-type', 'text/css');
        res.send(dexter.aggregated.css);
    });

    dexter.events.on('modulesFound', function () {
        for (var name in dexter.modules) {
            app.use('/' + name, express.static(config.root + '/' + dexter.modules[name].source +'/' + name + '/public'));
        }

        bootstrapRoutes();

        app.use(dexter.chainware.after);
        app.use(function (err, req, res, next) {
            if (~err.message.indexOf('not found')) {
                return next();
            }

            // log it
            console.error(err.stack);

            // error page
            res.status(500)
                .render('500', {
                    error: err.stack
                });
        });

        // assume 404 since no middleware responded
        app.use(function(req, res){
            res.status(404)
                .render('404', {
                    url: req.originalUrl,
                    error: 'Not found'
                });
        });

        if (process.env.NODE_ENV === 'development') {
            app.use(errorHander());
        }
    });

    function bootstrapRoutes() {
        util.walk(path.join(appPath, 'server'), 'routes', 'middlewares', function (route) {
            require(route)(app, passport);
        });
    }
};