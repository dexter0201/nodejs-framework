angular
    .module('nodejscore.system')
    .controller('HeaderController', ['$scope', '$rootScope', '$location', 'Menus', '$state', 'Users', function ($scope, $rootScope , $location, Menus, $state, Users) {
        $scope.menus = {};
        $scope.headerValues = {
            authenticated: Users.loggedin,
            user: Users.user,
            isAdmin: Users.isAdmin
        };

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
        queryMenus('account', []);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function () {
            queryMenus('main', defaultMainMenus);

            $scope.headerValues = {
                authenticated: Users.loggedin,
                user: Users.user,
                isAdmin: Users.isAdmin
            };
        });

        $scope.logout = function () {
            Users.logout();
        };

        $rootScope.$on('logout', function () {
            $scope.headerValues = {
                authenticated: false,
                user: {},
                isAdmin: false
            };
            $scope.menus = {};
        });
    }]);