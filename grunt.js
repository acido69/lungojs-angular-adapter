module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg:'<json:package.json>',
    meta:{
      banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; */  '
    },
    src: {
      js: ['src/value.js', 'src/*.js']
    },
    //Linter
    lint: {
      all: ['grunt.js', 'src/*.js']
    },
    jshint: {
      options: {
        browser: true,
        curly: true,
        eqnull: true
      },
      globals: {}
    },
    //Concat
    concat:{
      dist:{
        src:['<banner:meta.banner>', '<config:src.js>'],
        dest:'<%= distdir %>/<%= pkg.name %>.<%= pkg.version %>.js'
      }
    },
    //Minification
    min: {
      dist:{
        src:['<banner:meta.banner>', '<config:src.js>'],
        dest:'<%= distdir %>/<%= pkg.name %>.<%= pkg.version %>.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');
  grunt.registerTask('build', 'concat min');

};