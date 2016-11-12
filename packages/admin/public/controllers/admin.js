'use strict';

angular
    .module('dexter')
    .controller('AdminController', ['$scope', '$rootScope', '$location', 'Global', 'Menus', function ($scope, $rootScope , $location, Global, Menus) {
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


// 'use strict';

// angular
//     .module('dexter')
//     .controller('AdminController', ['$scope', '$rootScope', 'Globals', 'Menus',
//         function ($scope, $rootScope, Globals, Menus) {
//             console.log('a---');
//             $scope.global = Globals;
//             $scope.menus = {};

//             // Default hard coded menu items for main menu
//             var defaultAdminMenu = [{
//                 'roles': ['admin'],
//                 'title': 'MODULES',
//                 'link': 'modules',
//                 'subItems': $scope.global.modules
//             }, {
//                 'roles': ['admin'],
//                 'title': 'THEMES',
//                 'link': 'themes'
//             }, {
//                 'roles': ['admin'],
//                 'title': 'SETTINGS',
//                 'link': 'settings'
//             }, {
//                 'roles': ['admin'],
//                 'title': 'USERS',
//                 'link': 'users'
//             }];

//             function queryMenu(name, defaultMenu) {
//                 Menus.query({
//                     name: name,
//                     defaultMenu: JSON.stringify(defaultMenu)
//                 }, function(menu) {
//                     $scope.menus[name] = menu;
//                 });
//             }
//             console.log('212222');
//             queryMenu('admin', defaultAdminMenu);

//             $scope.isCollapsed = false;

//             $rootScope.$on('loggedin', function() {
//                 queryMenu('admin', defaultAdminMenu);
//                 $scope.global = {
//                     authenticated: !! $rootScope.user,
//                     user: $rootScope.user
//                 };
//             });
//         }
//     ]
// );