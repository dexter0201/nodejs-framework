//'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = mongoose.model('User'),
    config = require('./config');

module.exports = function (passport) {

    // serialize session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, function (err, user) {
            done(err, user);
        })
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }

            if (!user.authenticate(password)) {
                return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
        });
    }));

    // Facebook Authentication
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile, done);
    }));
};