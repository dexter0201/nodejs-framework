'use strict';

angular.module('dexter.theme').controller('ThemeController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
        $scope.package = {
            name: 'theme'
        };
    }
]);