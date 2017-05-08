'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpLoadPlugin = require('gulp-load-plugins');
const plugins = gulpLoadPlugin();
const through = require('through');
const gutil = require('gulp-util');

var paths = {
    js: [
        '*.js',
        '!*_bk.js',
        'test/**/*.js',
        '!bower_components/**',
        'packages/**/*.js',
        '!packages/**/node_modules/**'
    ],
    css: [
        '!bower_components/**',
        'packages/**/public/**/css/*.css'
    ],
    html: [
        'packages/**/public/**/views/**',
        'packages/**/server/views/**'
    ],
    less: [
        '**/public/**/css/*.less'
    ]
};

function log(taskName, message) {
    var fileCount = 0;

    through(function write() {
        fileCount++;
    }, function end() {
        gutil.log(
            gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.'
        );
        this.emit('end');
    });
}

gulp.task('csslint', function () {

});

gulp.task('clean', function (cb) {
    return del(['bower_components/build'], cb);
});

gulp.task('jshint', function () {
    return gulp.src(paths.js)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
        // .pipe(log('jshint', 'files lint free'));
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(plugins.less())
        .pipe(gulp.dest(function (vinylFile) {
            return vinylFile.cwd;
        }));
});

gulp.task('csslint', function () {
    // return gulp.src(paths.css)
    //     .pipe(plugins.csslint('.csslintrc'))
    //     .pipe(plugins.csslint.reporter());
        // .pipe(log('csslint', 'files lint free'));
});

gulp.task('env:develop', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('develop', ['env:develop'] , function () {
    plugins.nodemon({
        script: 'server.js',
        ext: 'html js',
        env: {
            'NODE_ENV': 'development'
        },
        ignore: ['./node_modules/**'],
        nodeArgs: ['--debug']
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.js, ['jshint']).on('change', plugins.livereload.changed);
    gulp.watch(paths.html).on('change', plugins.livereload.changed);
    gulp.watch(paths.css, ['csslint']).on('change', plugins.livereload.changed);
    gulp.watch(paths.less, ['less']).on('change', plugins.livereload.changed);
    plugins.livereload.listen({
        interval: 500
    });
});

var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'develop', 'watch'];

gulp.task('default', defaultTasks);