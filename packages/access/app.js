'use strict';

var dexter = require('nodejscore'),
    Module = dexter.Module,
    passport = require('passport');

var Access = new Module('access');

Access.register(function(database) {

    var auth = require('./server/config/authorization');

    require('./server/config/passport')(passport);

    dexter.register('auth', function() {
        return auth;
    });

    dexter.register('passport', function() {
        return passport;
    });

    Access.passport = passport;
    Access.middleware = auth;

    return Access;
});
