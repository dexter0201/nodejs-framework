(function () {
    'use strict';
    console.log('Debug... window.modules: ', window.modules);

    angular.element(document).ready(function() {
        // Fixing facebook bug with redirect
        // if (window.location.hash === '#_=_') {
        //     window.location.hash = '#!';
        // }

        angular.bootstrap(document, ['dexter']);
    });

    var packageModules = [],
        modules = [
            'ngCookies',
            'ngResource',
            'ui.bootstrap',
            'ui.router',
            'dexter.system'
        ];

    for (var index in window.modules) {
        var module = window.modules[index].module;

        angular.module(module, window.modules[index].angularDependencies || []);
        packageModules.push(module);
    }

    modules = modules.concat(packageModules);
    angular.module('dexter', modules);
}());
