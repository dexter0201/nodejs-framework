'use strict';

module.exports = function (Admin, app, auth) {
    var users = require('../controllers/users');

    app.get('/admin', function (req, res) {
        res.send('My name is Dexer. I\'m a Admin for this site');
    });

    app.route('/admin/users')
        .get(auth.requiresAdmin, users.all)
        .post(auth.requiresAdmin, users.create);
    app.route('/admin/users/:userId')
        .put(auth.requiresAdmin, users.update)
        .delete(auth.requiresAdmin, users.destroy);

    var themes = require('../controllers/themes');

    app.route('/admin/themes')
        .get(auth.requiresAdmin, themes.save);
    app.route('/themes/default.css')
        .get(themes.get);
};