'use strict';

module.exports = function (Users, app, auth/*, database*/) {
    app.get('/users/example/anyone', function(req, res/*, next*/) {
        res.send('Anyone can access this');
    });

    app.get('/users/example/auth', auth.requiresLogin, function(req, res/*, next*/) {
        res.send('Only authenticated users can access this');
    });

    app.get('/users/example/admin', auth.requiresAdmin, function(req, res/*, next*/) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/users/example/render', function(req, res/*, next*/) {
        Users.render('index', {
            package: 'users'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            if (err) {
                console.error(err);
            }

            res.send(html);
        });
    });
};