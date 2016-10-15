(function () {
    'use strict';

    var dexter = require('nodejscore');

    module.exports = function (app) {
        app.get('/admin/menu/:name', function (req, res) {
            var roles = req.user
                ? req.user.roles
                : ['annonymous'];
            var menu = req.params.name || 'main';

            res.jsonp(dexter.menus.get({
                roles: roles,
                menu: menu
            }));
        });
    };
}());