'use strict';

angular.module('dexter.system').config(['$stateProvider', '$urlRouterProvider', '$viewPathProvider',
    function ($stateProvider, $urlRouterProvider, $viewPathProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: $viewPathProvider.path('/system/views/index.html')
            });
    }
]).config(['$locationProvider',
    function ($locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
]);
