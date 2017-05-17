'use strict';

var nodejscore = require('nodejscore');

module.exports.get = function (req, res, next) {
    var roles = req.user ? req.user.roles : ['anonymous'],
        defaultMenu = req.query.queryMenu || [],
        items;

    if (roles.indexOf('admin') > -1) {
        roles.splice(roles.indexOf('admin'), 1);
    }

    if (!Array.isArray(defaultMenu)) {
        defaultMenu = [defaultMenu];
    }

    items = nodejscore.menus.get({
        roles: roles,
        defaultMenu: defaultMenu.map(function (item) {
            return JSON.parse(item);
        })
    });

    req.menus = items;
    next();
};