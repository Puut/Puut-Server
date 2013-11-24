
/**
 * Module dependencies.
 */

var express = require('express'),
  routes  = require('./routes'),
  picture = require('./routes/picture.js'),
  path    = require('path'),
  orm     = require('orm'),
  paging  = require('orm-paging');

module.exports = function(config) {
  var app = express();
  
  app.configure(function(){
    app.set('port', process.env.PORT || config.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
  
    app.use(orm.express(config.databaseUrl || "sqlite://database.db", {
      define: function(db, models, next) {
      
        db.use(paging);
      
        models.image = db.define('image', {
          content: { type: "binary" },
          contentType: { type: "text" },
          thumbnail: { type: "binary" },
          fileType: { type: "text" },
          thumbnailType: { type: "text" }
        });
      
        db.sync();
      
        next();
      }
    }));
  
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });
  
  var auth = express.basicAuth(function(user, pass) {    
    if(config.useAuth) {
      return user === config.username && pass === config.password;
    } else {
      return true;
    }
  });
  
  if(config.useAuth) {
    app.get('/', auth, routes.index);
    app.get('/upload', auth, routes.uploadingPage);    
    app.get('/info', auth, routes.info);
    
    app.post('/upload', auth, picture.uploadPicture);
  } else {
    app.get('/', routes.index);
    app.get('/upload', routes.uploadingPage);    
    app.get('/info', routes.info);
    
    app.post('/upload', picture.uploadPicture);
  }
  
  app.get('/:id.:format', picture.getPicture);
  app.get('/thumb/:id.:format', picture.getThumbnail);

  return app;
};
