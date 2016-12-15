'use strict';

var dexter = require('nodejscore');

module.exports = function (System, app/*, auth, database*/) {
    app.route('/admin/menu/:name')
        .get(function (req, res) {
            var roles = req.user
                ? req.user.roles
                : ['annonymous'];
            var menu = req.params.name || 'main',
                defaultMenu = req.query.defaultMenu || [],
                items;

            if (!Array.isArray(defaultMenu)) {
                defaultMenu = [defaultMenu];
            }

            items = dexter.menus.get({
                roles: roles,
                menu: menu,
                defaultMenu: defaultMenu.map(function (item) {
                    return JSON.parse(item);
                })
            });

            res.json(items);
        });
};
