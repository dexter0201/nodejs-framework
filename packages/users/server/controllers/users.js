'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

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
    res.jsonp(req.user || null);
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
                res.status(400).send('Username already taken');
                break;
            default:
                res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }

        req.logIn(user, function (err, next) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });

        res.status(200);
    });
};