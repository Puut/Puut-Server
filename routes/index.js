var Hashids   = require('hashids')
  , hashids   = new Hashids("Käsebrot", 4)
  , fs        = require('fs')
  , easyimage = require('easyimage');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  
  var page = req.query.page || 1;
  req.models.image.pages(function (err, pages) {
    if(page > pages) page = pages;
    
    req.models.image.page(page).order('id').run(function(err, images) {
      var finalImages = [];
      console.log(err);
      images.forEach(function(img) {
        img.hashid = hashids.encrypt(img.id);
        finalImages.push(img);
      });
    
      res.render('index', { title: 'Puut', images: finalImages, page: page, previousPage: parseInt(page) - 1, nextPage: parseInt(page) + 1, totalPages: pages});
    });
  });
  
};

/*
 * GET the uploading page
 */
exports.uploadingPage = function(req, res) {
  res.render('upload');
}
/*
 * POST an image
 */

exports.uploadPicture = function(req, res) {  
  var file = req.files.image;
  
  if(typeof file !== 'undefined' && file.size > 0) {
    fs.readFile(file.path, function(err, data) {
      var thumbnailFileName = '/tmp/hantz.jpg';
      
      easyimage.thumbnail({ src: file.path, dst: thumbnailFileName, width:128, height:128, x:0, y:0},
        function(err, image) {
          if (err) { res.end('error'); console.log(err); }
          else {
            fs.readFile(thumbnailFileName, function(errThumb, dataThumb) {
              req.models.image.create({
                contentType: file.type,
                content: data,
                thumbnail: dataThumb,
                thumbnailType: "jpg",
                
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
      res.set('Content-Disposition', 'inline');
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
      res.set('Content-Disposition', 'inline');
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