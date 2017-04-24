'use strict';

var nodejscore = require('nodejscore');
var Module = nodejscore.Module;
var Users = new Module('users');

function NodeJsCoreUser() {
    Module.call(this, 'users');
    this.auth = null;
}

NodeJsCoreUser.prototype = Object.create(Module.prototype, {
    value: NodeJsCoreUser,
    configurable: false,
    enumerable: false,
    writable: false
});

var nodejscoreUser = new NodeJsCoreUser();

nodejscoreUser.register(function (app, database, passport) {
    nodejscoreUser.auth = require('./authorization');
    require('./passport')(passport);
    nodejscore.register('auth', nodejscoreUser.auth);
    nodejscoreUser.routes(app, nodejscoreUser.auth, database, passport);
    nodejscoreUser.angularDependencies(['nodejscore.system']);

    return nodejscoreUser;
});