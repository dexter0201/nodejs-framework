'use strict';

angular.module('dexter.slacks').controller('SlackController', ['$scope', 'Global', 'Slack',
    function () {
        $scope.global = Global;
        $scope.package = {
            name: 'slacks'
        };
    }
]);