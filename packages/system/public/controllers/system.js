'use strict';

angular.module('dexter.system').controller('SystemController', ['$scope', 'Global',
    function($scope, Global, System) {
        $scope.global = Global;
        $scope.system = {
            name: 'system'
        };
    }
]);
