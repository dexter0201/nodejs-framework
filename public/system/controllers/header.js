angular
    .module('dexter.system')
    .controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global', 'Menus', '$state', function ($scope, $rootScope , $location, Global, Menus, $state) {
        $scope.global = Global;
        $scope.menus = {};

        var defaultMainMenus = [];

        function queryMenus(name, defaultMenu) {
            Menus.query({
                name: name,
                defaultMenu: JSON.stringify(defaultMenu)
            }, function (menu) {
                $scope.menus[name] = menu;
            });
        }

        $scope.goState = function (link) {
            $state.go(link);
        };

        queryMenus('main', defaultMainMenus);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function () {
            queryMenus('main', defaultMainMenus);
            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user
            };
        });
    }]);