(function () {
    'use strict';

    angular.module('dexter-factory-interceptor', [])
        .factory('httpInterceptor', ['$q', '$location', function ($q, $location) {
            return {
                response: function (res) {
                    if (res.status === 401) {
                        $location.path('/login');

                        return $q.reject(res);
                    }

                    return res || $q.when(res);
                },

                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $location.url('/login');

                        return $q.reject(rejection);
                    }

                    return $q.reject(rejection);
                }
            };
        }]);
        // .config([, function () {
        //     //$httpProvider.responseInterceptors.push('httpInterceptor');
        // }]);
}());