'use strict';

var nodejscore = require('nodejscore');

module.exports = function (System, app/*, auth, database*/) {
    app.route('/admin/menu/:name')
        .get(function (req, res) {
            var roles = req.user ?
                req.user.roles
                : ['annonymous'];
            var menu = req.params.name || 'main',
                items, defaultMenu;
 
            try {
                defaultMenu = JSON.parse(req.query.defaultMenu) || [];
            } catch (e) {
                defaultMenu = [];
            }

            if (!Array.isArray(defaultMenu)) {
                defaultMenu = [defaultMenu];
            }

            items = nodejscore.menus.get({
                roles: roles,
                menu: menu,
                defaultMenu: defaultMenu.map(function (item) {
                    return JSON.parse(item);
                })
            });

            res.json(items);
        });
};
