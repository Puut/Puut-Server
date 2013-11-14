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
      easyimage.thumbnail({ src: file.path, dst: '/tmp/hantz.jpg', width:128, height:128, x:0, y:0},
        function(err, image) {
          if (err) { res.end('error'); console.log(err); }
          else {
            fs.readFile('/tmp/hantz.jpg', function(errThumb, dataThumb) {
              req.models.image.create({
                contentType: file.type,
                content: data,
                thumbnail: dataThumb
              }, function(err, image) {
                if(err) {
                  console.log(err);
                  res.end('error');
                } else {
                  res.send({id: hashids.encrypt(image.id)});
                }
              });
            });
          }
        }
      );
      
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
 * GET a thumbnail
 */

exports.getThumbnail = function(req, res) {
  var id = hashids.decrypt(req.params.id);
  req.models.image.get(parseInt(id), function(err, image) {
    if(err) {
      res.render('404');
    } else {
      res.set('Content-Type', image.contentType);
      res.end(image.thumbnail);
    }
  });
};

/*
 * GET info 'bout the server
 */

exports.info = function(req, res) {
  res.end('PUUT');
}