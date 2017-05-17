'use strict';

angular.module('nodejscore.system').provider('$viewPath', function () {
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

            return this;
        };

        this.$get = function () {
            return this;
        };
    }

    return new ViewPathProvider();
});

angular.module('nodejscore.system').provider('$nodeJsCoreState', ['$stateProvider', '$viewPathProvider',
    function ($stateProvider, $viewPathProvider) {
        function NodeJsCoreStateProvider() {
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

        return new NodeJsCoreStateProvider();
    }
]);

angular.module('nodejscore.system').config(['$nodeJsCoreStateProvider', '$urlRouterProvider',
    function ($nodeJsCoreStateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $nodeJsCoreStateProvider
            .state('home', {
                url: '/',
                templateUrl: '/system/views/index.html'
            });

        $nodeJsCoreStateProvider
            .state('Log Out', {
                controller: function () {
                    window.location = '/logout';
                }
            });
    }
]).config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
        // $locationProvider.html5Mode({
        //     enable: true,
        //     requireBase: false
        // });
    }
]);
