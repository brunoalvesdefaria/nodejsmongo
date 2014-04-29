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
			jsPublic: {
				cwd: "src/js/public/",
				src: "**/*.js",
				dest: "public/js/",
				expand: true,
				ext: ".js"
			},
			dustPublic: {
				cwd: "views/",
				src: "public/**/*.dust",
				dest: "public/template/",
				expand: true,
				ext: ""
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
			}
		},

		replace: {
			icomoon: {
				src: options.replace.icomoon.src,
				dest: options.replace.icomoon.dest,
				replacements: [
					{
						from: "url('fonts/",
						to: "url('/css/fonts/"
					}
				]
			}
		},

		uglify: {
			require: {
				options: {
					mangle: {
						except: ["requirejs", "require", "define"]
					}
				},
				files: {
					"lib/requirejs/require.min.js": ["lib/requirejs/require.js"]
				},
				preserveComments: "some"
			},
			backbone: {
				options: {
					mangle: {
						except: ["Backbone", "_"]
					}
				},
				files: {
					"lib/backbone/backbone.min.js": ["lib/backbone/backbone.js"]
				},
				preserveComments: "some"
			},
			underscore: {
				options: {
					mangle: {
						except: ["_"]
					}
				},
				files: {
					"lib/underscore/underscore.min.js": ["lib/underscore/underscore.js"]
				},
				preserveComments: "some"
			},
			jsPublic: {
				options: {
					mangle: true
				},
				files: [{
					expand: true,
					cwd: "src/js/public/",
					src: "**/*.js",
					dest: "public/js/",
					ext: ".js"
				}]
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
				tasks: ["compass:watch"]
			},
			jsPublic: {
				files: ["src/js/public/**/*.js"],
				tasks: ["copy:jsPublic"]
			},
			dustPublic: {
				files: ["views/public/**/*.dust"],
				tasks: ["copy:dustPublic"]
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
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-text-replace");

	// Build Development
	grunt.registerTask(
		"buildDev",
		[
			"shell",
			"clean",
			"replace",
			"copy:jsPublic",
			"copy:cssDevelopment",
			"copy:fonts",
			"copy:dustPublic",
			"copy:jsDevelopment",
			"copy:envDevelopment",
			"compass:development"
		]
	);

	// Build Production
	grunt.registerTask(
		"buildProd",
		[
			"shell",
			"clean",
			"replace",
			"copy:jsPublic",
			"uglify",
			"copy:cssProduction",
			"copy:fonts",
			"copy:dustPublic",
			"copy:jsProduction",
			"copy:envProduction",
			"compass:production",
			"cssmin",
			"concat"
		]
	);

};
