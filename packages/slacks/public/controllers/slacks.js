'use strict';

angular.module('dexter.slacks').controller('SlackController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
        $scope.package = {
            name: 'slacks'
        };

        console.log($scope.package);
    }
]);