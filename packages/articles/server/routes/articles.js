'use strict';

var articles = require('../controllers/articles');

var hasAuthorization = function (req, res, next) {
    if (req.user.isAdmin() || req.article.user.id === req.user.id) {
        next();
    } else {
        res.send(401, 'User is not authorized');
    }
};

// module.exports = function (Articles, app, auth) {
//     app.route('/articles')
//         .get(articles.all)
//         .post(auth.requiresLogin, articles.create);
//     app.route('/articles/:articleId')
//         .get(articles.show)
//         .put(auth.requiresLogin, hasAuthorization, articles.update)
//         .delete(auth.requiresLogin, hasAuthorization, articles.destroy);
//     app.param('articleId', articles.article);
// };

module.exports = function (Articles, app) {
    app.route('/articles')
        .get(articles.all)
        .post(articles.create);
    app.route('/articles/:articleId')
        .get(articles.show)
        .put(hasAuthorization, articles.update)
        .delete(hasAuthorization, articles.destroy);
    app.param('articleId', articles.article);
};

