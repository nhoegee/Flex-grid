"use strict";

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    compass: {
			dist: {
				options: {
					sassDir: 'public/src/sass',
					cssDir: 'public/src/css',
          environment: 'development'
				}
			}
		},
    cssmin: {
      options: {
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/build/css/<%= pkg.name %>.min.css': ['public/src/css/*.css']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: ['public'],
          livereload: true,
          open: {
            target: 'http://localhost:3000/'
          }
        }
      }
    },
    watch: {
      css: {
        files: ['public/src/sass/**/*.{scss,sass}'],
        tasks: ['compass', 'cssmin']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['public/dist/css/<%= pkg.name %>.min.css']
      }
    }
	});

  grunt.registerTask('serve', 'Running the server task.', ['connect:server', 'watch']);

	grunt.registerTask('default', 'Running the default task.' );
};
