(function () {
    'use strict';

    module.exports = function (dexter) {
        var EventEmitter = require('events').EventEmitter;

        dexter.events = new EventEmitter();
        dexter.ready = function (data) {
            dexter.modules.push(data);

            return dexter.events.emit('ready', data);
        };
    };
}());