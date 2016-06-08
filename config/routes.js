// 'use strict'

var async = require('async');

module.exports = function (app, passport, auth) {
    var users = require('../app/controllers/users');

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.post('/users', users.create);
    app.post('/user/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password! Please try again!'
    }), users.session);

    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: [ 'email', 'user_about_me' ],
        failureRedirect: '/signin'
    }), users.signin);
    
    var articles = require('../app/controllers/articles');
    
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.param('articleId', articles.article);

    var index = require('../app/controllers/index');

    app.get('/', index.render);
};