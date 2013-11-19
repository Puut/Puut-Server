process.env.NODE_ENV = 'test';

require('blanket');

var puutApp = require('../app.js');

var testDatabase = "sqlite://test.db";

exports.puutWithAuth = puutApp({
  useAuth: true,
  username: "test",
  password: "test",
  databaseUrl: testDatabase
});

exports.puutWithoutAuth = puutApp({
  useAuth: false,
  username: "",
  password: "",
  databaseUrl: testDatabase
});