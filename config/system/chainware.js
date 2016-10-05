(function () {
    //'use strict';

    module.exports = function (dexter) {
        dexter.modules = [];
        dexter.middleware = {
            before: [],
            after: []
        };

        // Registering a module with basic middleware hooks for submodules
        dexter.register('middleware', function (app) {
            var middleware = {};

            middleware.add = function (event, weight, func) {
                dexter.middleware[event].splice(weight, 0, {
                    weight: weight,
                    func: func
                });
                dexter.middleware[event].join();
                dexter.middleware[event].sort(function (a, b) {
                    if (a.weight < b.weight) {
                        a.next = b.func;
                    } else {
                        b.next = a.func;
                    }

                    return (a.weight - b.weight);
                });
            };

            middleware.before = function (req, res, next) {
                if (!dexter.middleware.length) {
                    return next();
                }

                chain('before', 0, req, res, next);
            };

            middleware.after = function (req, res, next) {
                if (!dexter.middleware.length) {
                    return next();
                }

                chain('after', 0, req, res, next);
            };

            function chain(operator, index, req, res, next) {
                var args = [
                    req,
                    res,
                    function (err) {
                        if (dexter.middleware[operator][index + 1]) {
                            chain('before', index + 1, req, res, next);
                        } else {
                            next();
                        }
                    }
                ];

                dexter.middleware[operator][index].func.apply(this, args);
            }

            return middleware;
        });

        dexter.resolve('middleware');
    };
}());