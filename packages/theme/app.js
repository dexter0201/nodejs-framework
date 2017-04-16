'use strict';

var Module = require('nodejscore').Module;
var Theme = new Module('theme');

Theme.register(function (app, auth, database, passport) {
    Theme.routes(app, auth, database, passport);
    Theme.aggregateAsset('css', 'loginForms.css');
    Theme.aggregateAsset('css', 'theme.css');

    return Theme;
});