(function () {
    'use strict';

    // @TODO: Write full dexter module
    var fs = require('fs');

    var rebuild = module.exports.rebuild = function (callback) {
        fileStructure(function () {
            concatJs('controllers');
            concatJs('services');
            concatJs('config');
            buildLinks();
        });
    };

    var fileStructure = module.exports.fileStructure = function (callback) {
        var mkdirp = require('mkdirp');

        mkdirp('modules/public/js/sys', function () {
            mkdirp('modules/views', function () {
                if (typeof callback === 'function') {
                    callback();
                }
            })
        });
    };


    function concatJs(name) {
        var path = 'js/' + name;

        build();

        function build() {
            fs.writeFile('./modules/public/js/sys/' + name + '.js', '//' + new Date() + '\n', function (err) {
                if (err) {
                    throw err;
                }

                fs.readdir('./node_modules', function (err, modules) {
                    if (err) {
                        throw err;
                    }

                    if (!modules.lenght) {
                        return;
                    }

                    modules.forEach(function (module) {
                        fs.readFile('./node_modules/' + module + '/package.json', function (err, data) {
                            if (err) {
                                throw err;
                            }

                            if (data) {
                                try {
                                    var json = JSON.parse(data.toString());

                                    if (json.name) {
                                        if (json.name === 'config') {
                                            fs.readFile('./node_modules/' + module + '/public/js/config.js', function (err, data) {
                                                if (err) {
                                                    throw err;
                                                }

                                                if (data) {
                                                    data = '(function () {' + data + '}());'
                                                    fs.appendFile('modules/public/js/sys/' + name + '.js', data, function (err) {
                                                        if (err) {
                                                            throw err;
                                                        }

                                                        console.log(name + '.js appended from module: ' + module + ' file: config.js');
                                                    });
                                                }

                                            });
                                        }
                                    }

                                    fs.exists('./node_modules/' + module + '/public/' + path, function (exists) {
                                        if (exists) {
                                            fs.readdir('./node_modules/' + module + '/public/' + path, function (err, files) {
                                                files.forEach(function (file) {
                                                    fs.readFile('./node_modules/' + module + '/public/' + path + '/' + file, function (err, data) {
                                                        if (err) {
                                                            throw err;
                                                        }

                                                        if (data) {
                                                            fs.appendFile('modules/public/js/sys/' + name + '.js', data, function (err) {
                                                                if (err) {
                                                                    throw err;
                                                                }

                                                                console.log('name' + '.js appended from module: ' + module + ' file: ' + file);
                                                            });
                                                        }
                                                    });
                                                });
                                            });
                                        }
                                    });
                                } catch (e) {
                                    throw e;
                                }
                            }
                        });
                    });
                });
            });
        }
    }

    function buildLinks() {
        fs.readdir('./node_modules', function (err, modules) {
            if (err) {
                console.log(err);
            }

            modules.forEach(function (module) {
                // Check if it is dexter
                fs.readFile('./node_modules/' + module + '/package.json', function (err, data) {
                    if (data) {
                        try {
                            var json = JSON.parse(data.toString());

                            if (json.dexter) {
                                fs.exists('./node_modules/' + module + '/public', function (exists) {
                                    if (exists) {
                                        fs.unlink('./node_modules/public/' + module, function (err) {
                                            if (err) {
                                                console.log(err);
                                            }

                                            fs.symlink('../../node_modules/' + module + '/public', './modules/public', function (err) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            });
                                        });
                                    };
                                });

                                fs.exists('./node_modules/' + module + '/app/views/', function (exists) {
                                    if (exists) {
                                        fs.unlink('./modules/views/' + module, function (err) {
                                            if (err) {
                                                console.log(err);
                                            }

                                            fs.symlink('../../node_modules/' + module + '/app/views', './node_modules/app/views', function (err) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        } catch (e) {
                            throw e;
                        }
                    }
                });
            });
        });
    }
}());