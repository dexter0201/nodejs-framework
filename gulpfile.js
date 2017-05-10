'use strict';

const gulp = require('gulp');

gulp.paths = {
    develop: 'default',
    production: 'production',
    test: 'test',
    server: 'server'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('develop');
});