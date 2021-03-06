module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('config/assets.json'),
        clean: ['public/build'],
        watch: {
            html: {
                files: [
                    'public/views/**',
                    'server/views/**'
                ],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'server/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/css/**'],
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: [
                    'gruntfile.js',
                    'public/js/**/*.js',
                    'test/mocha/**/*.js',
                    'test/karma/**/*.js',
                    'server/**/*.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            core: {
                options: {
                    mangle: false
                },
                files: '<%= assets.core.js %>'
            }
        },
        csslint: {
            all: {
                src: ['public/css/**/*.css']
            }
        },
        cssmin: {
            core: {
                files: '<%= assets.core.css %>'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/mocha/**/*.js']
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './public/system/lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: true,
                    cleanBowerDir: true
                }
            }
        }
    });

    // grunt.option('force', true);

    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-csslint');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // //grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-nodemon');
    // grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-concurrent');
    // grunt.loadNpmTasks('grunt-bower-task');
    require('load-grunt-tasks')(grunt);

    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['clean', 'concurrent']);
    }

    //Test task.
    grunt.registerTask('test', ['mochaTest', 'karma:unit']);

    grunt.registerTask('test-karma', ['karma:unit']);

    grunt.registerTask('min', ['uglify', 'cssmin']);

    //Bower task.
    grunt.registerTask('install', ['bower']);
};
