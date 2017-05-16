'use strict';

var users = require('../controllers/users'),
    config = require('nodejscore').loadConfig(),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt');

module.exports = function (Users, app, auth, database, passport) {
    app.use('/api', expressJwt({
        secret: config.secret
    }));

    app.route('/register')
        .post(users.create);
    app.route('/login')
        .post(passport.authenticate('local', {
            failureFlash: true
        }), function (req, res) {
            var payload = req.user,
                token,
                escaped;

            payload.redirect = req.body.redirect;
            escaped = JSON.stringify(payload);
            escaped = encodeURI(escaped);
            token = jwt.sign(escaped, config.secret);

            res.json({
                token: token
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

    app.route('/get-config')
        .get(function (req, res) {
            var clientIdProperty = 'clientID',
                defaultPrefix = 'DEFAULT_',
                socialNetworks = ['facebook', 'linkedin', 'twitter', 'github', 'google'],
                configureApps = {};

            for (var network in socialNetworks) {
                var netObject = config[socialNetworks[network]];

                if (netObject && netObject.hasOwnProperty(clientIdProperty) &&
                    netObject[clientIdProperty].indexOf(defaultPrefix) < 0) {
                    configureApps[socialNetworks[network]] = true;
                }
            }

            res.send(configureApps);
        });
};
