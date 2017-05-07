'user strict';

angular.module('nodejscore.slacks').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('slacks dashboard', {
            url: '/slacks/dashboard',
            templateUrl: 'slacks/views/index.html'
        });
    }
]);