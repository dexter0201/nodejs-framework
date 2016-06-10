angular
    .module('dexter.system')
    .controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
        $scope.global = Global;
    }]);