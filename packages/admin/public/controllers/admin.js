'use strict';

angular
    .module('dexter')
    .controller('AdminController', ['$scope', '$rootScope', '$location', 'Global', 'Menus', '$state', function ($scope, $rootScope , $location, Global, Menus, $state) {
        $scope.global = Global;
        $scope.menus = {};

        var defaultAdminMenu = [{
            'roles': ['admin'],
            'title': 'MODULES',
            'link': 'modules',
            'subItems': $scope.global.modules
        }, {
            'roles': ['admin'],
            'title': 'THEMES',
            'link': 'themes'
        }, {
            'roles': ['admin'],
            'title': 'SETTINGS',
            'link': 'settings'
        }, {
            'roles': ['admin'],
            'title': 'USERS',
            'link': 'users'
        }];

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

        queryMenus('admin', defaultAdminMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function () {
            queryMenus('admin', defaultAdminMenu);
            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user
            };
        });
    }]);