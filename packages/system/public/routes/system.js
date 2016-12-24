'use strict';

angular.module('dexter.system').provider('$viewPath', function () {
    function ViewPathProvider() {
        var overrides = {};

        this.path = function (path) {
            return function () {
                return overrides[path] || path;
            };
        };

        this.override = function (defaultPath, newPath) {
            if (overrides[defaultPath]) {
                throw new Error('View already has an override: ' + defaultPath);
            }

            overrides[defaultPath] = newPath;
        };

        this.$get = function () {
            return this;
        };
    }

    return new ViewPathProvider();
});

angular.module('dexter.system').provider('$nodeJsCoreState', ['$stateProvider', '$viewPathProvider',
    function ($stateProvider, $viewPathProvider) {
        this.state = function (stateName, data) {
            if (data.templateUrl) {
                data.templateUrl = $viewPathProvider.path(data.templateUrl);
            }

            $stateProvider.state(stateName, data);

            return this;
        };

        this.$get = function () {
            return this;
        };
    }
]);

angular.module('dexter.system').config(['$nodeJsCoreStateProvider', '$urlRouterProvider',
    function ($nodeJsCoreStateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $nodeJsCoreStateProvider
            .state('home', {
                url: '/',
                templateUrl: '/system/views/index.html'
            });
    }
]).config(['$locationProvider',
    function ($locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
]);
