var Message = require('../schema/message');

module.exports = function (io) {
  threads = io.of('threads');
  threads.on('connection', function (threads) {
    console.log('a connection gone and happened');

    //join room with thread id
    threads.on('subscribe', function (room) {
      console.log('joining thread', room);
      threads.join(room);
    });

    threads.on('message', function (data) {
      console.log('message: ' + data.text);

      var message = new Message({
        text: data.text,
        user: data.user,
        thread: data.thread,
      });
      message.save(function (err) {
        console.log('error: ' + err);
      });

      io.of('threads').to(data.thread).emit('message', data);
    });

    threads.on('disconnect', function () {
      console.log('byeez');
    });
  });
};
