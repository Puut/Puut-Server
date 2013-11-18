var puutApp = require('../app.js');

exports.puutWithAuth = puutApp({
  useAuth: true,
  username: "test",
  password: "test"
});

exports.puutWithoutAuth = puutApp({
  useAuth: false,
  username: "",
  password: ""
});