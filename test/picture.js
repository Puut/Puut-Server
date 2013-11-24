var request = require('supertest'),
  express = require('express'),
  common  = require('./common.js'),
  should = require('should');
  
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
    it('should respond with html', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .auth('test', 'test')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });
  });
  
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
  
  describe('POST /upload with image and GET /:id.:format with it\'s ID', function() {
    it('should upload successfully and later on respond with an image', function(done) {
      request(puutWithoutAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          should.not.exist(err);

          var body = res.body;
          
          body.should.have.property('id').with.lengthOf(4);
          
          var id = body.id;
          
          request(puutWithoutAuth)
            .get("/" + id + ".png")
            .expect('Content-Type', /image/)
            .expect(200, done);
      });
    });
    it('should upload successfully and later on respond with a thumbnail', function(done) {
      request(puutWithoutAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          should.not.exist(err);

          var body = res.body;
          
          body.should.have.property('id').with.lengthOf(4);
          
          var id = body.id;
          
          request(puutWithoutAuth)
            .get("/thumb/" + id + ".png")
            .expect('Content-Type', /image/)
            .expect(200, done);
      });
    });
    it('should upload with auth successfully and later on respond with an image without auth', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .auth('test', 'test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          should.not.exist(err);

          var body = res.body;
          
          body.should.have.property('id').with.lengthOf(4);
          
          var id = body.id;
          
          request(puutWithAuth)
            .get("/" + id + ".png")
            .expect('Content-Type', /image/)
            .expect(200, done);
      });
    });
    it('should upload with auth successfully and later on respond with a thumbnail without auth', function(done) {
      request(puutWithAuth)
        .post('/upload')
        .attach('image', 'test/fixtures/screenshot.png')
        .auth('test', 'test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, function(err, res){
          should.not.exist(err);

          var body = res.body;
          
          body.should.have.property('id').with.lengthOf(4);
          
          var id = body.id;
          
          request(puutWithAuth)
            .get("/thumb/" + id + ".png")
            .expect('Content-Type', /image/)
            .expect(200, done);
      });
    });
  });
});