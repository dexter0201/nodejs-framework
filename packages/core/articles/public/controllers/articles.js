'use strict';

angular
    .module('nodejscore.articles')
    .controller('ArticlesController', ['$scope', 'Global', 'Articles', '$location', '$stateParams', function ($scope, Global, Articles, $location, $stateParams) {
        $scope.global = Global;

        $scope.hasAuthentization = function (article) {
            return $scope.global.isAdmin ||
                (article.user._id === $scope.global.user._id);
        };

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

        $scope.find = function () {
            Articles.query(function (articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function () {
            Articles.get({
                articleId: $stateParams.articleId
            }, function (article) {
                $scope.article = article;
            });
        };

        $scope.update = function () {
            var article = $scope.article;

            if (!article.updated) {
                article.updated = [];
            }

            article.updated.push(new Date().getTime());
            article.$update(function () {
                $location.path('articles/' + article._id);
            });
        };

        $scope.remove = function (article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function () {
                    $location.path('articles');
                });
            }
        };
    }]);