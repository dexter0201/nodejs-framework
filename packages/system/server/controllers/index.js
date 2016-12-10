'use strict';

var dexter = require('nodejscore');

module.exports.render = function (req, res) {
    var modules = [];
    var roles = req.user ? req.user.roles : [];

    for (var name in dexter.modules) {
        modules.push({
            name: name,
            module: 'dexter.' + name,
            angularDependencies: dexter.modules[name].angularDependencies
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
        adminEnabled: function () {
            return req.user && req.user.roles && req.user.roles.indexOf('admin') && dexter.moduleEnabled('admin');
        }
    });
};
