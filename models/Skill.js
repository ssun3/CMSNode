const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');

const SkillSchema = new Schema({
  title: String, 
  description: String,
  category: String
});

SkillSchema.plugin(toJson);

const Skill = mongoose.model('skill', SkillSchema);

module.exports = SkillSchema;