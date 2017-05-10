'use strict';

angular.module('nodejscore.system').controller('SystemController', ['$scope', 'Global',
    function($scope, Global/*, System*/) {
        $scope.global = Global;
        $scope.system = {
            name: 'system'
        };
    }
]);
