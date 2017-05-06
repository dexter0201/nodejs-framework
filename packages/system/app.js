'use strict';

var Module = require('nodejscore').Module,
    favicon = require('serve-favicon');

var System = new Module('system');

System.register(function (app, auth, database) {
    System.routes(app, auth, database);
    System.aggregateAsset('css', 'common.css');
    System.angularDependencies(['ui.router', 'nodejscore-factory-interceptor']);

    app.set('views', __dirname + '/server/views');

    app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
    app.useStatic(__dirname + '/public/assets/static');

    return System;
});