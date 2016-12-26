'use strict';

const cluster = require('cluster');
var nodejscore = require('nodejscore');

if (cluster.isMaster &&
    process.execArgv.indexOf('--debug') < 0 &&
    process.env.NODE_ENV !== 'test' &&
    process.execArgv.indexOf('--singleProcess') < 0) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i++) {
        console.log('forking ', i);
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        console.log('Worker ', worder.id, ' died :(');
        cluster.fork();
    });
} else {
    var workerid = !cluster.isMaster ? cluster.worker.id : 0;

    nodejscore.runInstance({
        workerid: workerid
    }, function (app, config) {
        var port = config.https && config.https.port ? config.https.port : config.http.port;

        console.log(
            'Dexter\'s app started on port ',
            config.https.port,
            ' (',
            process.env.NODE_ENV,
            ') cluster.worker.id ',
            workerid
        );
    });
}