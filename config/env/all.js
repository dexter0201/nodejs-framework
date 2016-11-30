var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,
    sessionSecret: 'Dexter',
    sessionController: 'sessions',
    templateEngine: 'swig',
    sessionCookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    },
    sessionName: 'connect.sid'
};
