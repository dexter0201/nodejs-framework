function ArticlesController($scope, Articles, $location) {
    $scope.articles = [];
    $scope.article = {};

    $scope.create = function () {
        var article = new Articles({
            title: this.title,
            content: this.content
        });
        
        article.$save(function (res) {
            $location.path('articles/' + res._id);
        });
        
        this.title = '';
        this.content = '';
    };
    
    $scope.find = function (query) {
        Articles.query(query, function (articles) {
            $scope.articles = articles;
        });
    };
}