module.exports = function (io) {
  threads = io.of('threads');
  threads.on('connection', function (threads) {
    console.log('a connection gone and happened');

    threads.on('chat.message', function (data) {
      console.log('message: ' + data);
      threads.emit('chat.message', data);
    });

    threads.on('disconnect', function () {
      console.log('byeez');
    });
  });
};
