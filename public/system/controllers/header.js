angular
    .module('dexter.system')
    .controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global', 'Menus', function ($scope, $rootScope , $location, Global, Menus) {
        $scope.global = Global;

        $scope.menus = {
            main: [{
                role: 'authenticated',
                title: 'Articles',
                link: 'all articles'
            }, {
                role: 'authenticated',
                title: 'Create New Article',
                link: 'create article'
            }]
        };

        Menus.query({
            name: 'main'
        }, function (mainMenu) {
            $scope.menus.main = $scope.menus.main.concat(mainMenu);
        });

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function () {
            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user
            };
        });
    }]);