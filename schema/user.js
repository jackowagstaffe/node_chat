var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean,
  img: String,
  description: String,
});

module.exports = mongoose.model('User', userSchema);
