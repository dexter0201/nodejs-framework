'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpLoadPlugin = require('gulp-load-plugins');
const plugins = gulpLoadPlugin();
const _ = require('lodash');

var paths = gulp.paths;
var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'develop', 'watch'];

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

function tokenizeConfig(config) {
    var destTokens = _.keys(config)[0].split('/');

    return {
        srcGlob: _.flatten(_.values(config)),
        destDir: destTokens[destTokens.length - 2],
        destFile: destTokens[destTokens.length - 1]
    };
}

gulp.task('default', defaultTasks);