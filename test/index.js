var request = require('supertest')
  , express = require('express')
  , common = require('./common.js');
  
  
var puutWithAuth = common.puutWithAuth;

var puutWithoutAuth = common.puutWithoutAuth

describe('Index', function(){
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

  describe('GET / JSON', function() {
    it('should respond with json', function(done) {
      request(puutWithoutAuth)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with json and with auth', function(done) {
      request(puutWithoutAuth)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .auth('hanß', 'ralf')
        .expect(200, done);
    });

    it('should respond with json and with correct auth', function(done) {
      request(puutWithoutAuth)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .auth('test', 'test')
        .expect(200, done);
    });

    it('should fail without auth', function(done) {
      request(puutWithAuth)
        .get('/')
        .set('Accept', 'application/json')
        .expect(401, done);
    });

    it('should fail with wrong auth', function(done) {
      request(puutWithAuth)
        .get('/')
        .set('Accept', 'application/json')
        .auth('heinz', 'peda')
        .expect(401, done);
    });

    it('should respond with json and auth', function(done) {
      request(puutWithAuth)
        .get('/')
        .set('Accept', 'application/json')
        .auth('test', 'test')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
