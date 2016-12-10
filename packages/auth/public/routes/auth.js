'use strict';

angular.module('dexter.users').config(['$stateProvider',
    function ($stateProvider) {
        var checkLoggedOut = function ($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function (user) {
                if (user !== '0') {
                    $timeout(function() {
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
                templateUrl: '/users/views/login.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('auth.register', {
                url: '/register',
                templateUrl: '/users/views/register.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            });
    }
]);
