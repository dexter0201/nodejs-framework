(function () {
    'use strict';

    angular.module('dexter.auth').config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
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

            $stateProvider
                .state('auth.login', {
                    url: '/login',
                    templateUrl: '/public/auth/views/login.html',
                    resolve: {
                        loggedin: checkLoggedOut
                    }
                })
                .state('auth.register', {
                    url: '/register',
                    templateUrl: '/public/auth/views/register.html',
                    resolve: {
                        loggedin: checkLoggedOut
                    }
                });
        }
    ]);
}());