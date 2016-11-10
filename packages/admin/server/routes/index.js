'use strict';

module.exports = function (Admin, app, auth, database) {
    var users = require('../controllers/users');

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