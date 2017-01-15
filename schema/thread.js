var mongoose = require('mongoose');

var threadSchema = mongoose.Schema({
  name: String,
  created: Date,
  updated: Date,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Thread', threadSchema);
