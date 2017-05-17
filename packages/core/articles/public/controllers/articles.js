'use strict';

angular
    .module('nodejscore.articles')
    .controller('ArticlesController', ['$scope', 'Global', 'Articles', '$location', '$stateParams', 'Users', function ($scope, Global, Articles, $location, $stateParams, Users) {
        $scope.global = Global;

        $scope.hasAuthentization = function (article) {
            return Users.isAdmin ||
                (article && article.user._id === Users.user._id);
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