(function () {
    'use strict';

    //angular.module('dexter', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'dexter.system', 'dexter.articles', 'dexter.auth']);
    angular.module('dexter.system', ['dexter.controllers.login', 'dexter-factory-interceptor']);
}());