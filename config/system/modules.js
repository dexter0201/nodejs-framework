(function () {
    // 'use strict';

    module.exports = function (dexter) {
        // Rebuild files structure
        require('./cli/lib/dexter').rebuild();

        // Middleware for adding chained function before or after routes
        require('./chainware')(dexter);

        // Events such as ready for modules to use
        require('./events')(dexter);

        dexter.events.on('ready', ready);

        var fs = require('fs');

        fs.exists(process.cwd() + '/node_modules', function (exists) {
            if (exists) {
                fs.readdir(process.cwd() + '/node_modules', function (err, files) {
                    if (err) {
                        console.log(err);
                    }

                    if (!files) {
                        files = [];
                    }

                    remaining = files.length;

                    files.forEach(function (file) {
                        if (file !== '.bin') {
                            fs.readFile(process.cwd() + '/node_modules/' + file + '/package.json', function (err, data) {
                                if (err) {
                                    throw err;
                                }

                                if (data) {
                                    var json = JSON.parse(data.toString());

                                    if (json.dexter) {
                                        require(process.cwd() + '/node_modules/' + file + '/app.js')(dexter);
                                    } else {
                                        ready();
                                    }
                                } else {
                                    ready();
                                }
                            });
                        }
                    });
                });
            }
        });

        // Process the ready event. WIll expand this in due course
        ready: function ready(data) {
            remaining--;
            if (!remaining) {
                resolve();
            }
        }

        // Resolve the dependencies once all modules are ready
        resolve: function resolve() {
            dexter.modules.forEach(function (module) {
                dexter.resolve.apply(this, [module.name]);
                dexter.get(module.name);
            });
        }
    };
}());