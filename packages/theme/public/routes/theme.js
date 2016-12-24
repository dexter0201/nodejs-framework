'use strict';

angular.module('dexter.theme').config(['$stateProvider', '$viewPathProvider',
    function ($stateProvider, $viewPathProvider) {
        $stateProvider
            .state('theme example page', {
                url: '/theme example page',
                templateUrl: $viewPathProvider.path('users/views/index.html')
            });
    }
]);
