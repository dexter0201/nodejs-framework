'use strict';

module.exports = function (System, app, auth, database) {
    var index = require('../controllers/index');

    app.route('/')
        .get(index.render);
};
