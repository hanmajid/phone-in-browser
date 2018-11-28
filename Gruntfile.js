module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js']
        },
        concat: {
            option: {
                separator: ';\n'
            },
            js: {
                src: ['src/js/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
            css: {
                src: 'src/css/*.css',
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        watch: {
            files: ['src/**/*.*'],
            tasks: ['jshint','concat','uglify','cssmin']
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
};