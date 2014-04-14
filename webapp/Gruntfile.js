/*global module:false */
module.exports = function(grunt) {
	"use strict";

	var options = grunt.file.readJSON("config/grunt/options.json"),
		development = grunt.file.readJSON("config/grunt/development.json"),
		production = grunt.file.readJSON("config/grunt/production.json");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		copy: {
			cssDevelopment: {
				src: options.copy.css.development,
				dest: "public/css/lib/",
				expand: true,
				flatten: true,
				ext: ".css"
			},
			cssProduction: {
				src: options.copy.css.production,
				dest: "public/css/lib/",
				expand: true,
				flatten: true,
				ext: ".css"
			},
			jsDevelopment: {
				src: options.copy.js.development,
				dest: "public/js/lib/",
				expand: true,
				flatten: true,
				ext: ".js"
			},
			jsProduction: {
				src: options.copy.js.production,
				dest: "public/js/lib/",
				expand: true,
				flatten: true,
				ext: ".js"
			},
			fonts: {
				src: options.copy.fonts,
				dest: "public/css/fonts/",
				expand: true,
				flatten: true
			},
			envDevelopment: {
				src: "config/envs/development.json",
				dest: "config/env.json"
			},
			envProduction: {
				src: "config/envs/production.json",
				dest: "config/env.json"
			}
		},

		compass: {
			watch: {
				options: options.sass.watch
			},
			development: {
				options: options.sass.development
			},
			production: {
				options: options.sass.production
			}
		},

		cssmin: {
			css: {
				expand: true,
				cwd: "public/css/",
				src: ["*.css", "!*.min.css"],
				dest: "public/css/",
				ext: ".css"
			}
		},

		concat: {
			css: {
				src: options.concat.css,
				dest: "public/css/style.css"
			},
			js: {
				src: options.concat.js,
				dest: "public/js/libs.js"
			}
		},

		clean: {
			files: [
				"public/**/*"
			]
		},

		watch: {
			sass: {
				files: ["src/sass/**/*.scss"],
				tasks: [
					"compass:watch"
				]
			}
		},

		shell: {
			environment: {
				command: [
					// Execute bower install to load front-end dependencies
					"cd config/bower/ && bower install",
				].join(" && "),
				options: {
					stdout: true
				}
			}
		}

	});

	// Enable plugins
	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask(
		"postInstall",
		[
			"shell:environment",
			"clean",
			"copy:cssDevelopment",
			"copy:fonts",
			"copy:jsDevelopment",
			"copy:envDevelopment",
			"compass:default"
		]
	);

	// Build Development
	grunt.registerTask(
		"buildDev",
		[
			"shell:environment",
			"clean",
			"copy:cssDevelopment",
			"copy:fonts",
			"copy:jsDevelopment",
			"copy:envDevelopment",
			"compass:development"
		]
	);

	// Build Production
	grunt.registerTask(
		"buildProd",
		[
			"shell:environment",
			"clean",
			"copy:cssProduction",
			"copy:fonts",
			"copy:jsProduction",
			"copy:envProduction",
			"compass:production",
			"cssmin",
			"concat"
		]
	);

};
