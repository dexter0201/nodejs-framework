'use strict';

var fs = require('fs');

module.exports.walk = function (path, excludeDir, callback) {
    fs.readdirSync(path).forEach(function (file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);

        if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
            callback(newPath);
        } else if (stat.isDirectory() && file !== excludeDir) {
            module.exports.walk(newPath);
        }
    });
};