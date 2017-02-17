const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



const app = express();






const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

mongoose.plugin(require('meanie-mongoose-to-json'));

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/susanPortfolio');
}
app.use(cors());

app.use(bodyParser.json());

aws.config.update({
    secretAccessKey: '/THCGfKW+jhW8So7U/oMwjDh/TZGybRvzZZiq0TB',
    accessKeyId: 'AKIAJYKSQYBNUV3XHY4A',
    region: 'us-west-1'
});

const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'aws-website-myportfolio-a59u8',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    cacheControl: 'max-age=31536000',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


//open in browser to see upload form
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//used by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {


    res.send("Uploaded!");
});


routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
