const mongoose = require("mongoose");
const {Schema}  = mongoose;

const movieSchema = new Schema({
  name:String,
  genre:String
});

module.exports = mongoose.model('Movie',movieSchema);