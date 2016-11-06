'use strict';

var dexter = require('nodejscore');

module.exports.render = function (req, res) {
    var modules = [];

    for (var name in dexter.modules) {
        modules.push({
            name: name,
            module: 'dexter.' + name,
            angularDependencies: dexter.modules[name].angularDependencies
        });
    }

    res.render('index', {
        user: req.user ? JSON.stringify(req.user.name) : 'null',
        roles: req.user ? JSON.stringify(req.user.roles) : JSON.stringify(['annonymous']),
        modules: JSON.stringify(modules)
    });
};
