'use strict';

var users = require('../controllers/users');

module.exports = function (app, passport) {
    // app.get('/signup', users.signup);
    app.post('/register', users.create);
    // app.post('/users/session', passport.authenticate('local', {
    //     failureRedirect: '/signin',
    //     failureFlash: true
    // }), users.session);
    app.post('/login', passport.authenticate('local', {
        failureFlash: true
    }), function (req, res) {
        res.send(req.user);
    });
    app.get('/logout', users.signout);
    app.get('/users/me', users.me);

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: [ 'email', 'user_about_me' ],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
};
