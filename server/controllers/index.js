'use strict';

var dexter = require('nodejscore');

module.exports.render = function (req, res) {
    var fs = require('fs');
    var modules = [];
    var themeFilePath = __dirname + '/../../packages/admin/theme.css';

    for (var name in dexter.modules) {
        modules.push({
            name: name,
            module: 'dexter.' + name,
            angularDependencies: dexter.modules[name].angularDependencies
        });
    }

    res.render('index', {
        user: req.user ? JSON.stringify({
            name: req.user.name,
            _id: req.user._id,
            username: req.user.username,
            roles: req.user ? req.user.roles : ['annonymous']
        }) : null,
        modules: JSON.stringify(modules),
        theme: fs.existsSync(themeFilePath)
    });
};
