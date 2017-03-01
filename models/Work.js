const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = require('./file');
const toJson = require('meanie-mongoose-to-json');

const WorkSchema = new Schema({
  title: String,
  role: String, 
  description: String,
  location: String,
  startDate: Date,
  endDate: Date,
  files: [FileSchema], 

});

WorkSchema.plugin(toJson);

const Work = mongoose.model('work', WorkSchema);

module.exports = Work;