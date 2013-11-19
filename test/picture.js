var request = require('supertest')
  , express = require('express')
  , common = require('./common.js');
  
var puutWithAuth = common.puutWithAuth;

var puutWithoutAuth = common.puutWithoutAuth;

describe('Pictures', function() {
  describe('POST /upload', function() {
    it('should fail without auth', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .set('Accept', 'text/html')
        .expect(401, done);
    });
    
    it('should fail with wrong auth', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .set('Accept', 'text/html')
        .auth('ralf', 'dietmar')
        .expect(401, done);
    });
    
    it('should fail without image and with json', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .auth('test', 'test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
  
  describe('POST /upload with image HTML', function() {
    it('should respond with json', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .auth('test', 'test')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });
  })
  
  describe('POST /upload with image JSON', function() {
    it('should respond with json', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .auth('test', 'test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});