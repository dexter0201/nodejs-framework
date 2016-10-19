(function () {
    'use strict';

    var dexter = require('nodejscore');

    module.exports = function (app) {
        app.get('/admin/menu/:name', function (req, res) {
            var roles = req.user
                ? req.user.roles
                : ['annonymous'];
            var menu = req.params.name || 'main';
            var defaultMenu = req.query.defaultMenu ? req.query.defaultMenu : [];
            var items;

            defaultMenu.forEach(function (item, index) {
                defaultMenu[index] = JSON.parse(item);
            });

            items = dexter.menus.get({
                roles: roles,
                menu: menu,
                defaultMenu: defaultMenu
            });

            res.jsonp(items);
        });
    };
}());