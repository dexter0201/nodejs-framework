'use strict';

angular.module('dexter').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        var checkLoggedIn = function ($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function (user) {
                if (user !== '0') {
                    $timeout(deferred.resolve, 0);
                } else {
                    $timeout(function () {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        var checkLoggedOut = function ($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function (user) {
                if (user !== '0') {
                    $timeout(function () {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                } else {
                    $timeout(deferred.resolve, 0);
                }
            });

            return deferred.promise;
        };


        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('all articles', {
                url: '/articles',
                templateUrl: 'articles/views/list.html',
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .state('create article', {
                url: '/articles/create',
                templateUrl: 'articles/views/create.html',
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .state('edit article', {
                url: '/articles/:articleId/edit',
                templateUrl: 'articles/views/edit.html',
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .state('view an article', {
                url: '/articles/:articleId',
                templateUrl: 'articles/views/view.html',
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .state('home', {
                url: '/',
                templateUrl: 'system/views/index.html'
            })
            .state('auth', {
                templateUrl: 'auth/views/index.html'
            })
            .state('auth.login', {
                url: '/login',
                templateUrl: 'auth/views/login.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('auth.register', {
                url: '/register',
                templateUrl: 'auth/views/register.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            });
}]);

angular.module('dexter').config(['$httpProvider', function ($httpProvider) {

}]);

angular.module('dexter').config(['$locationProvider', function ($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);