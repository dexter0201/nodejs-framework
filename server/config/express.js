//'use strict';

var express = require('express'),
    helpers = require('view-helpers'),
    consolidate = require('consolidate'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    expressValidator = require('express-validator'),
    assetmanager = require('assetmanager'),
    config = require('./config'),
    dexter = require('nodejscore'),
    fs = require('fs'),
    appPath = process.cwd();

module.exports = function (app, passport, db) {
    app.set('showStackError', true);

    // pretty HTML
    app.locals.pretty = true;
    // cache=memory or swig die in NODE_ENV=production
    app.locals.cache = 'memory';

    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    if (process.env.ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    // Assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // Set view path, template, engine, default layout
    app.set('views', config.root + '/server/views');
    app.set('view engine', 'html');

    app.enable('jsonp callback');

    app.configure(function () {
        app.use(express.cookieParser());
        //app.use(express.bodyParser());
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(expressValidator());
        app.use(express.methodOverride());

        var assets = assetmanager.process({
            assets: require('./assets.json'),
            webroot: 'public/public',
            debug: process.env.NODE_ENV !== 'production'
        });
        // Add assets to local veriables
        app.use(function (req, res, next) {
            res.locals({
                assets: assets
            });
            next();
        });

        app.use(express.session({
            secret: config.sessionSecret,
            store: new mongoStore({
                //db: db.connection.db,
                url: config.db,
                collection : config.sessionController
            })
        }));


        // dynamic helpers
        app.use(helpers(config.app.name));

        // express session
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(dexter.chainware.before);

        // connect flash for flash message
        app.use(flash());

        // routes should be at the last
        app.use(app.router);

        app.use(express.favicon());
        app.use('/public', express.static(config.root + '/public'));

        app.get('/modules/aggregated.js', function (req, res, next) {
            console.log('Express, getting aggregated.js');
            res.setHeader('content-type', 'text/javascript');
            res.send(dexter.aggregated.js);
        });

        app.get('/modules/aggregated.css', function (req, res, next) {
            // dexter.get('one').echo.log('Express, getting aggreagted.css..');
            dexter.resolve('one', function (one) {
                one.echo('Express, getting aggreagted.css..');
            });
            res.setHeader('content-type', 'text/css');
            res.send(dexter.aggregated.css);
        });

        dexter.events.on('modulesFound', function () {
            console.log('modulesFound....WOW');
            dexter.modules.forEach(function (module) {
                app.use('/' + module.name, express.static(config.root + '/node_modules/' + module.name + '/public'));
            });

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

        });
    });

    function bootstrapRoutes() {
        var routes_path = appPath + '/server/routes';
        dexter.resolve('one', function (one) {
            one.echo(routes_path);
        });

        var walk = function (path) {
            console.log('...bootstrap routes...: ', path);
            fs.readdirSync(path).forEach(function (file) {
                var newPath = path + '/' + file;
                var stats = fs.statSync(newPath);

                if (stats.isFile()) {
                    if (/(.*)\.(js$|coffee$)/.test(file)) {
                        require(newPath)(app, passport);
                    }
                } else if (stats.isDirectory() && file !== 'middlewares') {
                    walk(newPath);
                }
            });
        };

        walk(routes_path);
    }

};