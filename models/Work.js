const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FileSchema = require('./file');

const WorkSchema = new Schema({
  title: String,
  role: String, 
  description: String,
  projects: [{type: Schema.Types.ObjectId, ref: 'project'}],
  startDate: Date,
  endDate: Date,
  files: [{FileSchema}], 

});

const Work = mongoose.model('work', WorkSchema);

module.exports = Work;