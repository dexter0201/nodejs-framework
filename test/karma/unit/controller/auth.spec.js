(function () {
    'use strict';

    describe('Karma Test Controllers', function () {
        describe('LoginCtrl', function () {
            beforeEach(function () {
                this.addMatchers({
                    toEqualData: function (expected) {
                        return angular.equals(this.actual, expected);
                    }
                })
            })

            beforeEach(module('dexter'));

            var LoginCtrl,
                scope,
                $rootScope,
                $httpBackend,
                $location;

            beforeEach(inject(function ($controller, _$rootScope_, _$location_, _$httpBackend_) {
                scope = _$rootScope_.$new();
                $rootScope = _$rootScope_;

                LoginCtrl = $controller('LoginCtrl', {
                    $scope: scope,
                    $rootScope: _$rootScope_
                });

                $httpBackend = _$httpBackend_;
                $location = _$location_;
            }));

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('Should login with a correct user and password', function () {
                spyOn($rootScope, '$emit');
                $httpBackend.when('POST', '/login').respond(200, 'Fred');
                scope.login();
                $httpBackend.flush();
                expect($rootScope.user).toEqual('Fred');
                expect($rootScope.$emit).toHaveBeenCalledWith('loggedin');
                expect($location.url()).toEqual('/');
            });

            it('Should fail to login', function () {
                $httpBackend.expectPOST('/login').respond(400, 'Authentication failed');
                scope.login();
                $httpBackend.flush();
                expect(scope.loginError).toEqual('Authentication failed');
            });
        });
    });
});