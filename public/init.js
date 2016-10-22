angular.element(document).ready(function() {
    // Fixing facebook bug with redirect
    // if (window.location.hash === '#_=_') {
    //     window.location.hash = '#!';
    // }

    angular.bootstrap(document, ['dexter']);
});

angular.module('dexter', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'dexter.system', 'dexter.articles', 'dexter.auth']);
