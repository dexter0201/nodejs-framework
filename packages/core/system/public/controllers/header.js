angular
    .module('nodejscore.system')
    .controller('HeaderController', ['$scope', '$rootScope', '$location', 'Menus', '$state', 'Users', function ($scope, $rootScope , $location, Menus, $state, Users) {
        var vm = this;

        vm.menus = {};
        vm.headerValues = {
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
                vm.menus[name] = menu;
            });
        }

        vm.goState = function (link) {
            $state.go(link);
        };

        queryMenus('main', defaultMainMenus);
        queryMenus('account', []);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function () {
            queryMenus('main', defaultMainMenus);

            vm.headerValues = {
                authenticated: Users.loggedin,
                user: Users.user,
                isAdmin: Users.isAdmin
            };
        });

        vm.logout = function () {
            Users.logout();
        };

        $rootScope.$on('logout', function () {
            vm.headerValues = {
                authenticated: false,
                user: {},
                isAdmin: false
            };
            vm.menus = {};
            window.location.reload();
        });
    }]);