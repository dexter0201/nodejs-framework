'use strict';

angular.module('dexter.theme').config(['$nodeJsCoreStateProvider',
    function ($nodeJsCoreStateProvider) {
        $nodeJsCoreStateProvider
            .state('theme example page', {
                url: '/theme example page',
                templateUrl: 'users/views/index.html'
            });
    }
]);
