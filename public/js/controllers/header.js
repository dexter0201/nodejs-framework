angular
    .module('dexter.system')
    .controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global', function ($scope, $rootScope , $location, Global) {
        $scope.global = Global;

        $scope.menu = [
            {
                "title": "Articles",
                "link": "all articles"
            }, {
                "title": "Create New Article",
                "link": "create article"
            }
        ];

        $rootScope.$on('loggedin', function () {
            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user
            }
        });
    }]);