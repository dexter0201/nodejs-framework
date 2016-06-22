angular.module('dexter').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('all articles', {
            url: '/articles',
            templateUrl: 'views/articles/list.html'
        })
        .state('create article', {
            url: '/articles/create',
            templateUrl: '/views/articles/create.html'
        })
        .state('edit article', {
            url: '/articles/:articleId/edit',
            templateUrl: 'views/articles/edit.html'
        })
        .state('view an article', {
            url: '/articles/:articleId',
            templateUrl: 'views/articles/view.html'
        })
        .state('home', {
            url: '/',
            templateUrl: 'views/index.html'
        });
}]);

angular.module('dexter').config(['$httpProvider', function ($httpProvider) {

}]);

angular.module('dexter').config(['$locationProvider', function ($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);