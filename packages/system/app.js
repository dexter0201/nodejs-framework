'use strict';

var Module = require('nodejscore').Module,
    favicon = require('serve-favicon'),
    express = require('express');

var System = new Module('system');

System.register(function (app, auth, database) {
    System.routes(app, auth, database);
    System.aggregateAsset('css', 'common.css');

    app.set('views', __dirname + '/server/views');

    app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
    app.use(express.static(__dirname + '/public/assets/static')); // Adding robots and humans txt..

    return System;
});