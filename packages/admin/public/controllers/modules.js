'use strict';

angular.module('dexter').controller('ModulesController', ['$scope',
    function ($scope) {
        $scope.oneAtATime = true;
        $scope.modules = window.modules;
    }
]);