function HeaderController($scope, $location, Global) {
    $scope.global = Global;

    $scope.menu = [
        {
            "title": "Articles",
            "link": "articles"
        }, {
            "title": "Create New Article",
            "link": "articles/create"
        }
    ];

    $scope.init = function () {

    };

    $scope.isSelected = function (item) {
        return $location.path() === ('/' + item.link) ? 'active' : '';
    };
}