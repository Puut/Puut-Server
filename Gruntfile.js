module.exports = function(grunt) {
  
  grunt.initConfig({
    jshint: {
      server: [ '*.js', 'routes/**/*.js' ],
      tests: [ 'test/**/*.js' ]
    },
    
    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: [ 'test/*.js' ]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.registerTask('default', [ 'jshint' ]);
  grunt.registerTask('test', [ 'jshint', 'mochaTest' ]);
  
};
