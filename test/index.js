var request = require('supertest')
  , express = require('express')
  , common = require('./common.js');
  
  
var puutWithAuth = common.puutWithAuth;

var puutWithoutAuth = common.puutWithoutAuth
  
describe('GET /', function() {
  it('should respond with html', function(done) {
    request(puutWithoutAuth)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should respond with html and with auth', function(done) {
    request(puutWithoutAuth)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .auth('hanß', 'ralf')
      .expect(200, done);
  });

  it('should respond with html and with correct auth', function(done) {
    request(puutWithoutAuth)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .auth('test', 'test')
      .expect(200, done);
  });

  it('should fail without auth', function(done) {
    request(puutWithAuth)
      .get('/')
      .set('Accept', 'text/html')
      .expect(401, done);
  });

  it('should fail with wrong auth', function(done) {
    request(puutWithAuth)
      .get('/')
      .set('Accept', 'text/html')
      .auth('heinz', 'peda')
      .expect(401, done);
  });

  it('should respond with html and auth', function(done) {
    request(puutWithAuth)
      .get('/')
      .set('Accept', 'text/html')
      .auth('test', 'test')
      .expect(200, done);
  });
});

