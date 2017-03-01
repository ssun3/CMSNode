const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

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

app.use(morgan('combined'));
app.use(cors());


app.use(bodyParser.json());



routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
