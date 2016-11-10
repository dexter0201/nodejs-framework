'use strict';

var fs = require('fs'),
    request = require('request');

module.exports.save = function (req, res) {
    request(req.body.theme, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            fs.fs.writeFile('packages/admin/theme.css', body, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.send('saved');
                }
            });
        }
    });
};

module.exports.get = function (req, res) {
    var filePath = __dirname + '/../../theme.css';
    var readStream = fs.createReadStream(filePath, {
        autoClose: true
    });

    readStream.pipe(res);
};