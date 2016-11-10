'use strict';

angular.module('dexter')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/admin/users',
                template: '/admin/views/users.html'
            })
            .state('themes', {
                url: '/admin/themes',
                template: '/admin/views/themes.html'
            })
            .state('settings', {
                url: '/admin/settings',
                tempalte: '/admin/views/settings.html'
            })
            .state('modules', {
                url: '/admin/modules',
                template: '/admin/views/modules.html'
            });

    }]);
