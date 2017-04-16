'use strict';

//angular.module('dexter', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'dexter.system', 'dexter.articles', 'dexter.auth']);
angular.module('dexter.system', ['ui.router', 'dexter-factory-interceptor'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, toState/*, toParams, fromState, fromParams*/){
            var toPath = toState.url;

            toPath = toPath.replace(new RegExp('/', 'g'), '');
            toPath = toPath.replace(new RegExp(':', 'g'),'-');
            $rootScope.state = toPath;

            if ($rootScope.state === '' ) {
                $rootScope.state = 'firstPage';
            }
        });
    }]
);