
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , config = require('./config.json')
  , orm = require('orm');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.use(orm.express(process.env.DATABASE_URL || "sqlite://database.db", {
    define: function(db, models, next) {
      models.image = db.define('image', {
        content: { type: "binary" },
        contentType: { type: "text" }
      });
      
      models.image.sync();
      
      next();
    }
  }));
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/upload', routes.uploadPicture);
app.get('/:id.:format', routes.getPicture);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
