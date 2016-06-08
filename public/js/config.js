window.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/articles', {
            templateUrl: 'views/articles/list.html'
        })
        .when('/articles/create', {
            templateUrl: '/views/articles/create.html'
        })
        .when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        })
        .when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
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