mongoose = require('mongoose');
Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');

TechnologySchema = new Schema({
  title: String,
  description: String, 
});

TechnologySchema.plugin(toJson);

module.exports = TechnologySchema;