var request = require('supertest')
  , express = require('express')
  , common = require('./common.js');
  
var puutWithAuth = common.puutWithAuth;

var puutWithoutAuth = common.puutWithoutAuth;

describe('Pictures', function() {
  describe('POST /', function() {
    it('should fail without auth', function(done) {
      request(puutWithAuth)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(401, done);
    });
    
    it('should fail with wrong auth', function(done) {
      request(puutWithAuth)
        .get('/')
        .set('Accept', 'text/html')
        .auth('ralf', 'dietmar')
        .expect('Content-Type', /html/)
        .expect(401, done);
    });
  })
});