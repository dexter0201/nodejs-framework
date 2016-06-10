angular
    .module('dexter.system')
    .controller('HeaderController', ['$scope', '$location', 'Global', function ($scope, $location, Global) {
        $scope.global = Global;

        $scope.menu = [
            {
                "title": "Articles",
                "link": "articles"
            }, {
                "title": "Create New Article",
                "link": "articles/create"
            }
        ];
    }]);