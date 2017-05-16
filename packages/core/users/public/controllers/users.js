'use strict';

angular.module('nodejscore.users').controller('AuthController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.socialButtonsCounter = 0;

        $http.get('/get-config')
            .success(function (config) {
                $scope.socialButtons = config;
            }
        );
    }
]).controller('LoginCtrl', ['$scope', '$rootScope', 'Users',
    function ($scope, $rootScope, Users) {
        $scope.user = {};

        $scope.input = {
            type: 'password',
            placeholder: 'Password',
            confirmPasswordPlaceholder: 'Repeat Password',
            iconClass: '',
            tooltipText: 'Show Password'
        };

        $scope.togglePasswordVisible = function () {
            $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
            $scope.placeholder = $scope.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
            $scope.iconClass = $scope.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
            $scope.tooltipText = $scope.input.tooltipText === 'Show Password' ? 'Hide Password' : 'Show Password';
        };

        $rootScope.$on('loginfail', function () {
            $scope.loginError = Users.loginError;
        });

        $scope.login = function () {
            Users.login($scope.user);  
        };
    }
]).controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location', 'Users',
    function ($scope, $rootScope, $http, $location, Users) {
        $scope.user = {};

        $scope.registerForm = Users.registerForm = true;

        $scope.input = {
            type: 'password',
            placeholder: 'Password',
            placeholderConfirmPass: 'Repeat Password',
            iconClassConfirmPass: '',
            tooltipText: 'Show Password',
            tooltipTextConfirmPass: 'Show password'
        };

        $scope.togglePasswordVisible = function () {
            $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
            $scope.placeholder = $scope.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
            $scope.iconClass = $scope.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
            $scope.tooltipText = $scope.input.tooltipText === 'Show Password' ? 'Hide Password' : 'Show Password';
        };

        $scope.togglePasswordConfirmVisible = function() {
            $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
            $scope.input.placeholderConfirmPass = $scope.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
            $scope.input.iconClassConfirmPass = $scope.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
            $scope.input.tooltipTextConfirmPass = $scope.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
        };

        $rootScope.$on('loginfail', function () {
            $scope.registerError = Users.registerError;
        });

        $scope.register = function () {
            Users.register($scope.user);
        };
    }
]);
