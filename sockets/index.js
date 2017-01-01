module.exports = function (http) {
  var io = require('socket.io')(http);

  var threads = require('./threads')(io);
};
