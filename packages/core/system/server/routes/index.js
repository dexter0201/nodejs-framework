'use strict';

var nodejscore = require('nodejscore');
var menus = require('../controllers/menus');

module.exports = function (System, app/*, auth, database*/) {
    var index = require('../controllers/index');

    app.route('/')
        .get(menus.get, index.render);

    app.get('/*', function (req, res, next) {
        res.header('workerId', JSON.stringify(nodejscore.options.workerid));
        next();
    });
};
