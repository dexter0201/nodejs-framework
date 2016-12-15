'user strict';

angular.module('dexter.slacks').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('dexter example page', {
            url: '/slacks/example',
            templateUrl: 'slacks/views/index.html'
        });
    }
]);