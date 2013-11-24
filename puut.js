var app     = require('./app.js')(require('./config.json')),
  http    = require('http'),
  express = require('express');

app.use(express.logger('dev'));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
