'use strict';

angular.module('dexter').controller('ThemesController', ['$scope', '$rootScope', 'Globals', '$http',
    function ($scope, $rootScope, Globals, $http) {
        $scope.global = Globals;
        $scope.themes = [];

        $scope.init = function () {
            $http({
                method: 'GET',
                url: 'http://api.bootswatch.com/3/'
            }).success(function (data, status, headers, config) {
                $scope.themes = data.themes;
                console.log(status, headers, config);
            }).error(function (data, status, headers, config) {
                console.log('Error when get boot strap: ', data, status, headers, config);
            });
        };

        $scope.changeTheme = function (theme) {
            $scope.selectedTheme = theme;
            window.$('link').attr('href', theme.css);
        };

        $scope.save = function () {
            $http.get('/admin/themes?theme=' + $scope.selectedTheme.css)
                .success(function (data, status, headers, config) {
                    if (data) {
                        alert('Theme saved');
                    }
                    console.log(status, headers, config);
                }).error(function () {
                    alert('error');
                });
        };
    }
]);