module.exports = function(grunt) {
  
  grunt.initConfig({
    jshint: {
      server: [ '*.js', 'routes/**/*.js' ],
      client: [ 'public/**/*.js' ],
      tests: [ 'test/**/*.js' ]
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint')
  
  grunt.registerTask('default', [ 'jshint' ]);
  
};
