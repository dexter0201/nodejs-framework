module.exports = function (app, passport, auth) {
    var index = require('../controllers/index');

    app.get('/', index.render);
};