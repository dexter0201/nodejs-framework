var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    templatePath = path.normalize(__dirname + '/../app/public'),
    notifier = {};

module.exports = {
    development: {
        db: 'mongodb://localhost/nodejs-framework-dev',
        root: rootPath,
        notifier: notifier,
        templatePath: templatePath,
        app: {
            name: 'Kalel\'s nodejs framework'
        },
        facebook: {
            clientID: '123',
            clientSecret: '12121',
            callbackURL: 'http://...'
        }
    },
    test: {

    },
    production: {

    }
};