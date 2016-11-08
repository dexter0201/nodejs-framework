'use strict';

var users = require('../controllers/users');

module.exports = function (app, passport) {
    // app.get('/signup', users.signup);
    app.route('/register')
        .post(users.create);
    // app.post('/users/session', passport.authenticate('local', {
    //     failureRedirect: '/signin',
    //     failureFlash: true
    // }), users.session);
    app.route('/login')
        .post(passport.authenticate('local', {
            failureFlash: true
        }), function (req, res) {
            res.send({
                user: req.user,
                redirect: req.user.roles.indexOf('admin') !== -1 ? req.get('referer') : false
            });
        });
    app.route('/logout')
        .get(users.signout);
    app.route('/users/me')
        .get(users.me);

    app.route('/auth/facebook')
        .get(passport.authenticate('facebook', {
            scope: [ 'email', 'user_about_me' ],
            failureRedirect: '/signin'
        }), users.signin);

    app.route('/loggedin')
        .get(function (req, res) {
            res.send(req.isAuthenticated() ? req.user : '0');
        });
};
