'use strict';

var articles = require('../controllers/articles');

var hasAuthorization = function (req, res, next) {
    if (req.user.isAdmin() || req.article.user.id === req.user.id) {
        next();
    } else {
        res.status(401).send('User is not authorized');
    }
};

module.exports = function (Articles, app, auth) {
    app.route('/articles')
        .get(articles.all)
        .post(articles.create);
    app.route('/articles/:articleId')
        .get(auth.isMongoId, articles.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, articles.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, articles.destroy);
    app.param('articleId', articles.article);
};

