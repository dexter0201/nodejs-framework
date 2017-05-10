'use strict';

angular.module('nodejscore.slacks').controller('SlackController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
        $scope.package = {
            name: 'slacks'
        };
    }
]);