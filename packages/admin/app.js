'use strict';

var dexter = require('nodejscore');
var Module = dexter.Module;
var Admin = new Module('Admin');
var assetmanager = require('assetmanager');

Admin.register(function (app, auth, database) {
    Admin.aggregateAsset('css', 'admin.css');
    Admin.aggregateAsset('css', 'themes.css');
    Admin.aggregateAsset('js', 'users.js');
    Admin.aggregateAsset('js', 'themes.js');
    Admin.aggregateAsset('js', 'modules.js');

    Admin.routes(app, auth, database);

    return Admin;
});