'use strict';

const gulp = require('gulp');

var env = process.env.NODE_ENV || 'development';

gulp.paths = {
    development: 'default',
    production: 'production',
    test: 'test',
    server: 'server'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function (defaultTasks) {
    gulp.start(env);
});