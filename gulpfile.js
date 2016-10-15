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
}());