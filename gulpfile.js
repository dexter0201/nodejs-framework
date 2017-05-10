'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpLoadPlugin = require('gulp-load-plugins');
const plugins = gulpLoadPlugin();
const through = require('through');
const gutil = require('gulp-util');
const _ = require('lodash');
const path = require('path');

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
    },
    assets = require('./config/assets.json');

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

gulp.task('env:production', function () {
    process.env.NODE_ENV = 'production';
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

gulp.task('cssmin', function () {
    var config = tokenizeConfig(assets.core.css);

    if (config.srcGlob.length) {
        return gulp.src(config.srcGlob)
            .pipe(plugins.cssmin({
                keepBreaks: true
            }))
            .pipe(plugins.concat(config.destFile))
            .pipe(gulp.dest(path.join('bower_components/build', config.destDir)));
    }
});

gulp.task('uglify', function () {
    var config = tokenizeConfig(assets.core.js);

    if (config.srcGlob.length) {
        return gulp.src(config.srcGlob)
            .pipe(plugins.concat(config.destFile))
            .pipe(plugins.uglify({
                mangle: false
            }))
            .pipe(gulp.dest(path.join('bower_components/build', config.destDir)));
    }
});

var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'develop', 'watch'];

if (process.env.NODE_ENV === 'production') {
    defaultTasks = ['clean', 'cssmin', 'uglify'];
}

gulp.task('default', defaultTasks);