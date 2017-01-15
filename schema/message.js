var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  text: String,
  created: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
  },
  settings: {
    font: String,
    color: String,
    backgroundColor: String,
  },
});

module.exports = mongoose.model('Message', messageSchema);
