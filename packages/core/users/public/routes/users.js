'use strict';

angular.module('nodejscore.users')
    .config(['$nodeJsCoreStateProvider', '$httpProvider', 'jwtInterceptorProvider',
        function ($nodeJsCoreStateProvider, $httpProvider, jwtInterceptorProvider) {
            var checkLoggedOut = function ($q, $timeout, $http, $location) {
                var deferred = $q.defer();

                $http.get('/api/loggedin').success(function (user) {
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

            jwtInterceptorProvider.tokenGetter = function () {
                return localStorage.getItem('JWT');
            };

            $httpProvider.interceptors.push('jwtInterceptor');

            $nodeJsCoreStateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'users/views/index.html'
                })
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
