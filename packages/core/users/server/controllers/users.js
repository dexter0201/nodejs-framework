'use strict';

var mongoose = require('mongoose'),
    config = require('nodejscore').loadConfig(),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken');

exports.authCallback = function (req, res) {
    res.redirect('/');
};

exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    res.redirect('#!/login');
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.me = function (req, res) {
    var user = {};

    if (req.user) {
        user = typeof req.user === 'object' ?
            req.user : JSON.parse(decodeURI(req.user));
    }

    res.json(user);
};

// Show profile
exports.show = function (req, res) {
    var user = req.profile;

    res.render('/users/show', {
        title: user.name,
        user: user
    });
};

exports.session = function (req, res) {
    res.redirect('/');
};

exports.create = function (req, res) {
    var user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        provider: 'local'
    });

    req.assert('name', 'You must enter a name').notEmpty();
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    user.save(function (err) {
        if (err) {
            switch (err.code) {
            case 11000:
            case 11001:
                res.status(400).send({
                    msg: 'Username already taken',
                    param: 'username'
                });
                break;
            default:
                var errorModel = [];

                for (var error in err.errors) {
                    errorModel.push({
                        param: error,
                        msg: err.errors[error].message,
                        value: err.errors[error].value
                    });
                }

                res.status(400).send(errorModel);
            }

            return res.status(400);
        }

        var payload = user;

        payload.redirect = req.body.redirect;
        payload = JSON.stringify(payload);
        payload = encodeURI(payload);

        req.logIn(user, function (err, next) {
            if (err) {
                return next(err);
            }

            var token = jwt.sign(payload, config.secret);
            
            res.json({
                token: token
            });
        });

        res.status(200);
    });
};