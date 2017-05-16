'use strict';

angular
    .module('nodejscore.users')
    .factory('Users', ['$http', '$rootScope', '$location', '$stateParams', function ($http, $rootScope, $location, $stateParams) {
        function NodejscoreUser() {
            this.name = 'users';
            this.user = {};
            this.registerForm = false;
            this.loggedin = false;
            this.isAdmin = false;
            this.loginError = 0;
            this.usernameError = null;
            this.registerError = null;
            this.resetPasswordError = null;
            this.validationError = null;
            $http.get('/api/users/me').success(this.onIndentity.bind(this));
        }

        NodejscoreUser.prototype.onIndentity = function (response) {
            this.loginError = 0;
            this.loggedin = true;
            this.registerError = 0;

            if (response === null) {
                this.user = {};
                this.loggedin = false;
                this.isAdmin = false;
            } else if (angular.isDefined(response.token)) {
                localStorage.setItem('JWT', response.token);

                var encodedProfile = decodeURI(b64_to_utf8(response.token.split('.')[1])),
                    payload = JSON.parse(encodedProfile);

                    this.user = payload;

                    if (this.user.roles.indexOf('admin') > -1) {
                        this.isAdmin = true;
                    }

                    $rootScope.$emit('loggedin');

                    if (payload.redirect) {
                        $location.path(payload.redirect);
                    } else {
                        $location.url('/');
                    }
            } else {
                this.user = response;
                this.loggedin = true;

                if (this.user.roles.indexOf('admin') > -1) {
                    this.isAdmin = true;
                }

                $rootScope.$emit('loggedin');
            }
        };

        NodejscoreUser.prototype.onIdFail = function (response) {
            $location.path(response.redirect);
            this.loginError = 'Authentication failed';
            this.registerError = response.msg;
            this.validationError = response.msg;
            this.resetPasswordError = response.msg;
            $rootScope.$emit('loginfail');
        };

        NodejscoreUser.prototype.login = function (user) {
            var destination = $location.path().indexOf('/login') > -1 ? $location.absUrl() : false;

            $http.post('/login', {
                email: user.email,
                password: user.password,
                redirect: destination
            })
            .success(this.onIndentity.bind(this))
            .error(this.onIdFail.bind(this));
        };

        NodejscoreUser.prototype.register = function (user) {
            $http.post('/register', {
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword,
                username: user.username,
                name: user.name
            })
            .success(this.onIndentity.bind(this))
            .error(this.onIdFail.bind(this));
        };

        NodejscoreUser.prototype.resetpassword = function (user) {
            $http.post('/reset/' + $stateParams.tokenID, {
                password: user.password,
                confirmPassword: user.confirmPassword
            })
            .success(this.onIndentity.bind(this))
            .error(this.onIdFail.bind(this));
        };

        NodejscoreUser.prototype.forgotpassword = function (user) {
            $http.post('/reset-password', {
                text: user.email
            })
            .success(this.onIndentity.bind(this))
            .error(this.onIdFail.bind(this));
        };

        NodejscoreUser.prototype.logout = function () {
            this.user = {};
            this.isAdmin = false;
            this.loggedin = false;
            localStorage.removeItem('JWT');
            $rootScope.$emit('logout');
            $http.get('/logout');
        };

        function escape(html) {
            return String(html)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }

        function b64_to_utf8(str) {
            return decodeURIComponent(window.atob(str));
        }

        return new NodejscoreUser();
    }
]);