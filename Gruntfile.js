var sass = require('node-sass');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.scss'],
                    dest: 'dest/',
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dest/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dest/',
                    ext: '.min.css'
              }]
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'dest/',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dest/',
                    ext: '.min.js'
                }]
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dest/main.js': 'src/main.js'
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,JPG,jpeg,gif}'],
                    dest: 'dest/images/'
                }]
            }
        },

        watch: {
            sass: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            babel: {
                files: 'src/main.js',
                tasks: ['babel']
            }
        }
    });
  
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'babel', 'imagemin', 'watch']);
  
};