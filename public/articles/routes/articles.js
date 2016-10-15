(function () {
    'use strict';

    anuglar.module('dexter.articles')
        .config(['$stateProvider', '$urlRouterProvider',
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
                    .state('all articles', {
                        url: '/articles',
                        templateUrl: 'public/articles/views/list.html',
                        resolve: {
                            loggedin: checkLoggedIn
                        }
                    })
                    .state('create article', {
                        url: '/articles/create',
                        templateUrl: 'public/articles/views/create.html',
                        resolve: {
                            loggedin: checkLoggedIn
                        }
                    })
                    .state('edit article', {
                        url: '/articles/:articleId/edit',
                        templateUrl: 'public/articles/views/edit.html',
                        resolve: {
                            loggedin: checkLoggedIn
                        }
                    })
                    .state('article by id', {
                        url: '/articles/:articleId',
                        templateUrl: 'public/articles/views/view.html',
                        resolve: {
                            loggedin: checkLoggedIn
                        }
                    });
            }
        ]);
}());