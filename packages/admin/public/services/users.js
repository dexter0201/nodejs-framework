'use strict';

angular.module('dexter').factory('Users', ['$resource', function ($resource) {
    return $resource('/admin/users/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
