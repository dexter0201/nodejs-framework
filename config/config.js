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
            clientID: '1562841474033434',
            clientSecret: '834273fab74cc3d494c4e362e2b3609b',
            callbackURL: 'http://abc.com'
        }
    },
    test: {

    },
    production: {

    }
};