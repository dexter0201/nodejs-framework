(function () {
    'use strict';

    module.exports = function (dexter) {
        // Rebuild files structure
        require('./cli/lib/dexter').rebuild();

        // @TODO: Middleware for adding chained function before or after routes
        // @TODO: Events handler
    };
}());