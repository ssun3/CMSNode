const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');

const SkillSchema = new Schema({
  title: String, 
  description: String,
});

SkillSchema.plugin(toJson);

module.exports = SkillSchema;