(function () {
    'use strict';

    angular.module('dexter.system')
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: '/public/system/views/index.html'
                    })
                    .state('auth', {
                        templateUrl: '/users/views/index.html'
                    });
            }
        ])
        .config(['$locationProvider', function ($locationProvider) {
            //$locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }]);
}());