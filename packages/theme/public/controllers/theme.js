'use strict';

angular.module('nodejscore.theme').controller('ThemeController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
        $scope.package = {
            name: 'theme'
        };
    }
]);