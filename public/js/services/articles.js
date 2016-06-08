window.app.factory('Articles', function ($resource) {
    return $resource('articles/:articleId',
            {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
});