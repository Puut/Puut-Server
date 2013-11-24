var Hashids   = require('hashids'),
  hashids   = new Hashids("Käsebrot", 4),
  fs        = require('fs'),
  easyimage = require('easyimage');
  
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
                  var finalId = hashids.encrypt(image.id);
                  console.log("New image with id:", finalId);
                  if(req.accepts("html, json") == "json") {
                    res.type("json");
                    res.send({id: finalId});
                  } else {
                    var url = req.protocol + "://" + req.get('host') + '/' + finalId + '.png';
                    res.render('uploaded', {
                      id: finalId, 
                      url:url
                    });
                  }
                }
              });
            });
          }
        }
      );
    
    });
  } else {
    if(req.accepts("html, json") == "json") {
      res.send(400, {
        error: 'Image is missing!' 
      });
    } else {
      res.send(400, 'Image is missing!');
    }
  }
};

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
};

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
