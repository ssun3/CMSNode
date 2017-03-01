const aws = require('aws-sdk');
const config = require('../config');


aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: config.AWS_REGION
});


const s3 = new aws.S3();

module.exports = {

  create(req, res){
    var key = req.file.originalname + "-" + Date.now().toString();
    var s3request = {
      Body: req.file.buffer,
      Bucket: config.AWS_BUCKET,
      Key: key,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
      CacheControl: 'max-age=31536000',
    };
    s3.putObject(s3request, function(err, data){
      res.json({
        mimeType: req.file.mimetype,
        url: "https://s3.amazonaws.com/" + config.AWS_BUCKET + "/" + key,
        key: key,
        thumbnailUrl: "to be added.."
      });
    });
  },

  index(req, res){
    s3.listObjects({Bucket: 'aws-website-myportfolio-a59u8'}, function(err, data){
      res.json(data);
    })
  },
 
  show(req, res){
    var options = {
      Bucket: config.AWS_BUCKET,
      Key: req.params.key
    };
    s3.getObject(options, function(err, data){
      res.json(data);
    });
  },

  delete(req, res){
    var options = {
      Bucket: config.AWS_BUCKET,
      Key: req.params.key
    };
    s3.deleteObject(options, function(err, data){
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  }

//example get buckets
// app.get('/api/buckets', function (req, res, next) {
//   s3.listBuckets(function(err, data){
//     res.json(data);
//   });

// });

}
