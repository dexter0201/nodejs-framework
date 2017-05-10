'use strict';

angular.module('nodejscore.system').factory('Menus', ['$resource', function ($resource) {
    return $resource('admin/menu/:name', {
        name: '@name',
        defaultMenu: '@defaultMenu'
    });
}]);
