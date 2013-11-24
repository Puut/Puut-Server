module.exports = function(grunt) {
  
  grunt.initConfig({
    jshint: {
      server: [ '*.js', 'routes/**/*.js' ],
      tests: [ 'test/**/*.js' ]
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('default', [ 'jshint' ]);
  
};
