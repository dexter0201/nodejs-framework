(function () {
    'use strict';

    const gulp = require('gulp');
    const eslint = require('gulp-eslint');

    gulp.task('eslint', () => {
        /**
         * ESLint ignores files with node_modules paths.
         * So, it's best have gulp ignore the directory as well.
         * Also, be sure to return the stream from the task.
         * Otherwise, the task my end before the stream has finished.
         */
        return gulp.src(['**/*.js', '!node_modules', '!public/system/lib/**/*.js', '!test/**/*.js'])
            // eslint() attaches the lint output to the "eslint" property
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an erro code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());

    // gulp.task('default', ['lint'], function () {
    //     // This will only run if the lint task is successful...
    // });
    });

    /**
     *
     *
     * Support gulp
     *
     */

    // const del = require('del');
    const path = require('path');
    const gutil = require('gulp-util');
    const through = require('through');
    const gulpLoadPlugins = require('gulp-load-plugins');
    // const karma = require('karma').server;
    const _ = require('lodash');

    var plugins = gulpLoadPlugins({
            DEBUG: true
        }),
        paths = {
            js: [
                '*.js',
                'test/**/*.js',
                '!test/coverage/**',
                '!bower_components/**',
                'packages/**/*.js',
                '!packages/**/node_moudles/**',
                '!packages/contrib/**/*.js',
                '!packages/contrib/**/node_modules/**'
            ],
            html: [
                'packages/**/public/**/views/**',
                'packages/**/server/views/**'
            ],
            css: [
                '!bower_components/**',
                'packages/**/public/**/css/*.css',
                '!packages/contrib/**/public/**/css/*.css'
            ],
            less: ['**/public/**/css/*.less']
        },
        assets = require('./config/assets.json');

    function count(taskName, message) {
        var fileCount = 0;

        function countFiles(file) {
            fileCount++;
        }

        function endStream() {
            gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + message || 'files processed.');
            this.emit('end');
        }

        return through(countFiles, endStream);
    }

    function tokenizeConfig(config) {
        var destTokens = _.keys(config)[0].split('/');

        return {
            srcGlob: _.flatten(_.values(config)),
            destDir: destTokens[destTokens.length - 2],
            destFile: destTokens[destTokens.length - 1]
        };
    }

    gulp.task('jshint', () => {
        return gulp.src(paths.js)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'))
            .pipe(plugins.jshint.reporter('fail'))
            .pipe(count('jshint', 'files lint free'));
    });

    gulp.task('uglify', () => {
        var config = tokenizeConfig(assets.core.js);

        if (config.srcGlob.length) {
            return gulp.src(config.srcGlob)
                .pipe(plugins.concat(config.destFile))
                .pipe(
                    plugins.uglify({
                        mangle: true
                    })
                )
                .pipe(
                    gulp.dest(
                        path.join(
                            'bower_components/build',
                            config.destDir
                        )
                    )
                );
        }
    });

    gulp.task('cssmin', () => {
        var config = tokenizeConfig(assets.core.css);

        if (config.srcGlob.length) {
            return gulp.src(config.srcGlob)
                .pipe(
                    plugins.cssmin({
                        keepBreaks: true
                    })
                )
                .pipe(
                    plugins.concat(config.destFile)
                )
                .pipe(
                    gulp.dest(
                        path.join(
                            'bower_components/build',
                            config.destDir
                        )
                    )
                );
        }
    });
}());