var Hashids = require('hashids')
  , hashids = new Hashids("Käsebrot", 4)
  , fs      = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Puut' });
};

exports.uploadPicture = function(req, res) {  
  var file = req.files.image;
  
  if(typeof file !== 'undefined' && file.size > 0) {
    fs.readFile(file.path, function(err, data) {
      req.models.image.create({
        contentType: file.type,
        content: data
      }, function(err, image) {
        if(err) {
          res.end('error');
        } else {
          res.send(hashids.encrypt(image.id));
        }
      });
    });
  } else {
    res.end('error');
  }
}

exports.getPicture = function(req, res) {
  var id = hashids.decrypt(req.params.id);
  req.models.image.get(parseInt(id), function(err, image) {
    if(err) {
      res.render('404');
    } else {
      res.set('Content-Type', image.contentType);
      res.end(image.content);
    }
  });
}

exports.info = function(req, res) {
  res.end('PUUT');
}