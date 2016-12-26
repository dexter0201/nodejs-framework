'use strict';

module.exports = function(Slacks, app, auth/*, database*/) {

    app.get('/slacks/example/anyone', function(req, res/*, next*/) {
        res.send('Anyone can access this');
    });

    app.get('/slacks/example/auth', auth.requiresLogin, function(req, res/*, next*/) {
        res.send('Only authenticated users can access this');
    });

    app.get('/slacks/example/admin', auth.requiresAdmin, function(req, res/*, next*/) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/slacks/example/render', function(req, res/*, next*/) {
        Slacks.render('index', {
            package: 'slacks'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
