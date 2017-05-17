'use strict';

var nodejscore = require('nodejscore');

module.exports.render = function (req, res) {
    var modules = [];
    var roles = req.user ? req.user.roles : [];

    for (var name in nodejscore.modules) {
        modules.push({
            name: name,
            module: 'dexter.' + name,
            angularDependencies: nodejscore.modules[name].angularDependencies
        });
    }

    res.render('index', {
        user: req.user ? {
            name: req.user.name,
            _id: req.user._id,
            username: req.user.username,
            roles: roles
        } : {},
        modules: modules,
        menus: req.menus,
        isAdmin: req.user && req.user.roles.indexOf('admin') > -1,
        adminEnabled: function () {
            return req.user && req.user.roles && req.user.roles.indexOf('admin') && nodejscore.moduleEnabled('admin');
        }
    });
};
