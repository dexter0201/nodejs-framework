var articles = require('../controllers/articles');
var authorization = require('./middlewares/authorization');

var hasAuthorization = function (req, res, next) {
    if (req.article.user.id != req.user.id) {
        res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function (app, passport) {

    app.get('/articles', articles.all);
    app.post('/articles', authorization.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.update);
    app.del('/articles/:articleId', authorization.requiresLogin, hasAuthorization, articles.destroy);
    app.param('articleId', articles.article);
};