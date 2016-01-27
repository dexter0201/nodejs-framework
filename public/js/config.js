window.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
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

}]);