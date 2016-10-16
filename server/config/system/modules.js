(function () {
    'use strict';

    var fs = require('fs');

    module.exports = function (dexter, app) {
        dexter.modules = [];
        dexter.middleware = {
            before: [],
            after: []
        };
        dexter.aggregated = {
            js: '',
            css: ''
        };

        findDexterModules();
        enableDexterModules();
        aggregateJs();

        app.get('/modules/aggregated.js', function (req, res) {
            res.setHeader('content-type', 'text/javascript');
            res.send(dexter.aggregated.js);
        });

        function findDexterModules() {
            fs.stat(process.cwd() + '/node_modules', function (err, stats) {
                if (err) {
                    console.log(err);
                    return;
                }

                if (stats.isDirectory()) {
                    fs.readdir(process.cwd() + '/node_modules', function (err, files) {
                        if (err) {
                            console.log(err);
                        }

                        if (!files) {
                            files = [];
                        }

                        files.forEach(function (file, index) {
                            if (file === '.bin') {
                                return;
                            }

                            fs.readFile(process.cwd() + '/node_modules/' + file + '/package.json', function (err, data) {
                                if (err) {
                                    throw err;
                                }

                                if (data) {
                                    var json = JSON.parse(data.toString());

                                    if (json.dexter) {
                                        console.log('WOWWWWWWW...Found Dexter...Pushing into dexter.modules...');
                                        dexter.modules.push({
                                            name: json.name,
                                            version: json.version
                                        });
                                    }
                                }

                                if (files.length - 1 === index) {
                                    dexter.events.emit('enableDexterModules');
                                }
                            });
                        });
                    });
                }
            });
        }

        function enableDexterModules() {
            dexter.events.on('enableDexterModules', function () {
                dexter.modules.forEach(function (module) {
                    console.log('Enable dexter module: ', module.name);
                    require(process.cwd() + '/node_modules/' + module.name + '/app.js')(dexter);
                });

                dexter.modules.forEach(function (module) {
                    dexter.resolve.apply(this, [module.name]);
                    dexter.get(module.name);
                });

                return dexter.modules;
            });
        }


        function aggregateJs() {
            dexter.aggregated.js = '';
            dexter.events.on('enableDexterModules', function () {
                // var files = [
                //     'config',
                //     'services',
                //     'controllers'
                // ];

                dexter.modules.forEach(function (module) {
                    readFile(process.cwd() + '/node_modules/' + module.name + '/public/js/');

                    function readFile(path) {
                        fs.stat(path, function (stats) {
                            if (stats.isDirectory()) {
                                fs.readdir(path, function (err, files) {
                                    files.forEach(function (file) {
                                        fs.readFile(path + file, function (err, data) {
                                            if (err) {
                                                throw err;
                                            }

                                            if (!data) {
                                                readFile(path + file + '/');
                                            } else {
                                                dexter.aggregated.js += '(function () { ' + data.toString() + ' }());';
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    }
                });
            });
        }
    };
}());