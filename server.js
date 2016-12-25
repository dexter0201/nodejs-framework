'use strict';

var nodejscore = require('nodejscore');

nodejscore.runInstance({}, function (app, config) {
    console.log('Dexter\'s app started on port ' + config.http.port + ' (' + process.env.NODE_ENV + ')');

    if (config.https && config.https.port) {
        console.log('Dexter\'s secure app started on port ' + config.https.port + ' (' + process.env.NODE_ENV + ')');
    }
});