var Hashids   = require('hashids'),
  hashids   = new Hashids("Käsebrot", 4);

/*
 * GET home page.
 */

exports.index = function(req, res) {
  var page = req.query.page || 1;
  req.models.image.pages(function (err, pages) {
    if(page > pages) page = pages;
    
    req.models.image.page(page).order('id').run(function(err, images) {
      var finalImages = [];
      if(images) {
        images.forEach(function(img) {
          img.hashid = hashids.encrypt(img.id);

          finalImages.push({hashid: img.hashid, contentType: img.contentType});
        });
      }
      if(req.accepts("json, html") == "json") {
        res.type("json");
        res.send(finalImages);
      } else {
        res.render('index', { title: 'Puut', images: finalImages, page: page, previousPage: parseInt(page) - 1, nextPage: parseInt(page) + 1, totalPages: pages});
      }
    });
  });
  
};

/*
 * GET the uploading page
 */
exports.uploadingPage = function(req, res) {
  res.render('upload');
};

/*
 * GET info 'bout the server
 */

exports.info = function(req, res) {
  res.end('PUUT');
};
