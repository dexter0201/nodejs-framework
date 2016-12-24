'use strict';

angular.module('dexter.system').provider('$viewPath', function () {
    function ViewProvider() {
        var overrides = {};

        this.path = function (path) {
            return function () {
                return overrides[path] || path;
            };
        };

        this.override = function (defaultPath, newPath) {
            if (overrides[defaultPath]) {
                throw new Error('View already has an override: ' + defaultPath);
            }

            overrides[defaultPath] = newPath;
        };

        this.$get = function () {
            return this;
        };
    }

    return new ViewProvider();
});