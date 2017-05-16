module.exports = {
    'db': 'mongodb://dbadmin:dbadmin@ds021943.mlab.com:21943/nodejs-framework',
    'app': {
        'name': 'MEAN - A Modern Stack - Production'
    },
    logging: {
        format: 'combined'
    },
    secret: 'TOKEN_KEY',
    'facebook': {
        'clientID': 'APP_ID',
        'clientSecret': 'APP_SECRET',
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },
    'twitter': {
        'clientID': 'CONSUMER_KEY',
        'clientSecret': 'CONSUMER_SECRET',
        'callbackURL': 'http://localhost:3000/auth/twitter/callback'
    },
    'github': {
        'clientID': 'APP_ID',
        'clientSecret': 'APP_SECRET',
        'callbackURL': 'http://localhost:3000/auth/github/callback'
    },
    'google': {
        'clientID': 'APP_ID',
        'clientSecret': 'APP_SECRET',
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    }
};