'use strict';

var Module = require('nodejscore').Module;
var Articles = new Module('articles');

Articles.register(function (app, auth, database) {
    Articles.routes(app, auth, database);

    Articles.menus.add({
        roles: ['authenticated'],
        title: 'Articles',
        link: 'all articles'
    });

    Articles.menus.add({
        roles: ['authenticated'],
        title: 'Create New Articles',
        link: 'create article'
    });

    Articles.aggregateAsset('css', 'articles.css');

    return Articles;
});