var _ = require('underscore');

module.exports = _.extend(
    require(__dirname + '/../config/env/all'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);