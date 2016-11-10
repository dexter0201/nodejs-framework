'use strict';

angular.module('dexter').controller('UsersController', ['$scope', 'Globals', 'Menus', '$rootScope', 'Users',
    function ($scope, Globals, Menus, $rootScope, Users) {
        $scope.globals = Globals;
        $scope.userSchema = [{
            title: 'Email',
            schemaKey: 'email',
            type: 'text',
            inTable: true
        }, {
            title: 'Name',
            schemaKey: 'name',
            type: 'text',
            inTable: true
        }, {
            title: 'Username',
            schemaKey: 'username',
            type: 'text',
            inTable: true
        }, {
            title: 'Roles',
            schemaKey: 'roles',
            type: 'select',
            inTable: true
        }, {
            title: 'Password',
            schemaKey: 'password',
            type: 'password',
            inTable: false
        }, {
            title: 'Repeat password',
            schemaKey: 'confirmPassword',
            type: 'password',
            inTable: false
        }];
        $scope.roles = ['authenticated', 'admin'];
        $scope.user = {};

        $scope.init = function () {
            Users.query({}, function (users) {
                $scope.users = users;
            });
        };

        $scope.add = function () {
            if (!$scope.users) {
                $scope.users = [];
            }

            var user = new Users({
                email: $scope.user.email,
                name: $scope.user.name,
                username: $scope.user.username,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword,
                roles: $scope.user.roles
            });

            user.$save(function (_user) {
                $scope.users.push(_user);
            });

            this.firstName = this.lastName = this.email = this.password = this.role = "";
        };

        $scope.update = function (user) {
            user.$update();
        };

        $scope.remove = function (user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.getRoleName = function () {

        };
    }
]);
