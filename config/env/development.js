module.exports = {
    db: 'mongodb://localhost/nodejs-framework',
    debug: true,
    logging: {
        format: 'tiny'
    },
    aggregate: false,
    app: {
        name: 'Dexter Nguyen - Nodejs Framework'
    },
    dbs: {
        dev: 'mongodb://localhost/nodejs-framework-dev'
    },
    secret: 'TOKEN_KEY',
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }
};
