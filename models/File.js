mongoose = require('mongoose');
Schema = mongoose.Schema;
const toJson = require('meanie-mongoose-to-json');

FileSchema = new Schema({
  title: String,
  description: String,
  url: String, 
  thumbnailUrl: String, 
  mimeType: String,
  order: Number
});

FileSchema.plugin(toJson);

module.exports = FileSchema;