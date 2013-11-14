var Hashids   = require('hashids')
  , hashids   = new Hashids("Käsebrot", 4)
  , fs        = require('fs')
  , easyimage = require('easyimage');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Puut' });
};

/*
 * POST an image
 */

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
          res.send({id: hashids.encrypt(image.id)});
        }
      });
    });
  } else {
    res.end('error');
  }
}

/*
 * GET an image
 */

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

/*
 * GET info 'bout the server
 */

exports.info = function(req, res) {
  res.end('PUUT');
}