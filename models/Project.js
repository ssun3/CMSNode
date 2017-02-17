const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');
const FileSchema = require('./File');
const TechnologySchema = require('./Technology');

const ProjectSchema = new Schema({
  title: String,
  role: String, 
  description: String,
  work: {type: Schema.Types.ObjectId, ref: 'work'},
  category: String, 
  technologiesUsed: [TechnologySchema],
  hostedUrl: String,
  githubRepo: String,
  startDate: Date,
  endDate: Date,
  files: [FileSchema], 
});


ProjectSchema.plugin(toJson);


const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;