angular
    .module('dexter.system')
    .controller('HeaderController', ['$scope', '$rootScope', '$location', 'Global', 'Menus', function ($scope, $rootScope , $location, Global, Menus) {
        $scope.global = Global;
        $scope.menus = {};

        var defaultMainMenus = [{
            roles: ['authenticated'],
            title: 'Articles',
            link: 'all articles'
        }, {
            roles: ['authenticated'],
            title: 'Create New Article',
            link: 'create article'
        }];

        function queryMenus(name, defaultMenu) {
            Menus.query({
                name: name,
                defaultMenu: JSON.stringify(defaultMenu)
            }, function (menu) {
                $scope.menus[name] = menu;
            });
        }

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