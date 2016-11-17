'use strict';

var dexter = require('nodejscore');

module.exports.render = function (req, res) {
    var modules = [];
    var roles = req.user ? req.user.roles : [];
    var enableAdmin = false;

    for (var name in dexter.modules) {
        if (name === 'admin' && roles.indexOf('admin') > -1) {
            enableAdmin = true;
        }

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
        } : null,
        modules: modules,
        enableAdmin: enableAdmin,
        authenticated: roles
    });
};
