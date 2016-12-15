'use strict';

var Module = require('nodejscore').Module;
var Slacks = new Module('slacks');

Slacks.register(function (app, auth, database) {
    Slacks.routes(app, auth, database);

    Slacks.menus.add({
        title: 'Slacks Dashboard',
        link: 'Slacks Dashboard',
        roles: ['authenticated'],
        menu: 'main'
    });

    Slacks.aggregateAsset('css', 'slacks.css');

    return Slacks;
});