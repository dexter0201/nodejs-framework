'use strict';

var Module = require('nodejscore').Module;
var Users = new Module('users');

Users.register(function (app, auth, database, passport) {
    Users.routes(app, auth, database, passport);
    Users.aggregateAsset('js', 'user.js');
    Users.aggregateAsset('css', 'users.css');

    return Users;
});