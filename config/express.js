//'use strict';

var helpers = require('view-helpers'),
    consolidate = require('consolidate'),
    morgan = require('morgan'),
    compression = require('compression'),
    flash = require('connect-flash'),
    nodejscore = require('nodejscore'),
    config = nodejscore.loadConfig(),
    express = require('express');

function onAggregatedSrc(position, ext, res, next, data) {
    res.locals.aggregatedAssets[position][ext] = data;
    next && next();
}

module.exports = function (app, db) {
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

    app.use('/bower_components', express.static(config.root + '/bower_components'));

    if (process.env.ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');

    // dynamic helpers
    app.use(helpers(config.app.name));

    // connect flash for flash message
    app.use(flash());
};