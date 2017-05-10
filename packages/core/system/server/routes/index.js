'use strict';

var nodejscore = require('nodejscore');

module.exports = function (System, app/*, auth, database*/) {
    var index = require('../controllers/index');

    app.route('/')
        .get(index.render);

    app.get('/*', function (req, res, next) {
        res.header('workerId', JSON.stringify(nodejscore.options.workerid));
        next();
    });
};
