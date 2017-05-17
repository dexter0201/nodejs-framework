'use strict';

angular.module('nodejscore.articles')
    .config(['$stateProvider',
        function ($stateProvider) {
            var checkLoggedIn = function ($q, $timeout, $http, $location) {
                var deferred = $q.defer();

                $http.get('/api/loggedin').success(function (user) {
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
                .state('article by id', {
                    url: '/articles/:articleId',
                    templateUrl: 'articles/views/view.html',
                    resolve: {
                        loggedin: checkLoggedIn
                    }
                });
        }
    ]);
