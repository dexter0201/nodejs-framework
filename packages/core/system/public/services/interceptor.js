'use strict';

angular.module('nodejscore-factory-interceptor', [])
    .factory('httpInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            response: function (res) {
                if (res.status === 401) {
                    $location.path('/auth/login');

                    return $q.reject(res);
                }

                return res || $q.when(res);
            },

            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.url('/auth/login');

                    return $q.reject(rejection);
                }

                return $q.reject(rejection);
            }
        };
    }]);