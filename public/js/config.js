window.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/acticles', {
            templateUrl: 'views/acticles/list.html'
        })
        .when('/acticles/create', {
            templateUrl: '/views/acticles/create.html'
        })
        .when('/acticles/:acticleId/edit', {
            templateUrl: 'views/acticles/edit.html'
        })
        .when('/acticles/:acticleId', {
            templateUrl: 'views/acticles/view.html'
        })
        .when('/', {
            templateUrl: 'views/index.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

window.app.config(['$httpProvider', function ($httpProvider) {

}]);

window.app.config(['$locationProvider', function ($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);