'use strict';

var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');

var hasAuthorization = function (req, res, next) {
    if (req.article.user.id != req.user.id) {
        res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (app) {
    app.route('/articles')
        .get(articles.all)
        .post(authorization.requiresLogin, articles.create);
    app.route('/articles/:articleId')
        .get(articles.show)
        .put(authorization.requiresLogin, hasAuthorization, articles.update)
        .delete(authorization.requiresLogin, hasAuthorization, articles.destroy);
    app.param('articleId', articles.article);
};
