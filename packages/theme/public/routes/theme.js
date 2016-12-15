'use strict';

angular.module('dexter.theme').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('theme example page', {
                url: '/theme example page',
                templateUrl: 'users/views/index.html'
            });
    }
]);
