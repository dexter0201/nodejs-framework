'use strict';

angular.module('dexter').controller('AdminController', ['$scope', '$rootScope', 'Globals', 'Menus',
    function ($scope, $rootScope, Globals, Menus) {
        $scope.global = Globals;
        $scope.menus = {};

        // Default hard coded menu items for main menu
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

        function queryMenu(name, defaultMenu) {
            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        queryMenu('admin', defaultAdminMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {
            queryMenu('admin', defaultAdminMenu);
            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });
    }
]);