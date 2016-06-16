module.exports = function (app, passport) {
    var index = require('../controllers/index');

    app.get('/', index.render);
};