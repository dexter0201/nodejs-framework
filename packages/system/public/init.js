'use strict';

angular.element(document).ready(function() {
    // Fixing facebook bug with redirect
    // if (window.location.hash === '#_=_') {
    //     window.location.hash = '#!';
    // }

    angular.bootstrap(document, ['dexter']);
});

var packageModules = [],
    initModules = [
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

initModules = initModules.concat(packageModules);
angular.module('dexter', initModules);
