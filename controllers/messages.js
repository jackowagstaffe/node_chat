var express = require('express');
var router = express.Router();
var Thread = require('../schema/thread');
var Message = require('../schema/message');
var mongoose = require('mongoose');
var authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware(), function (request, response) {
  Message.find({
    thread: request.params.threadId,
  }).exec(function (err, messages) {
    if (err) return console.error(err);

    response.send(JSON.stringify(messages));
  });
});

router.post('/', authMiddleware(), function (request, response) {
  var message = new Message({
    text: request.body.text,
    user: request.user,
  });
  message.save(function (err) {
    console.log(err);
  });

  response.status(201).json({
    id: message.id,
  });
});

router.get('/:messageId', authMiddleware(), function (request, response) {
  Message.findById(request.params.messageId, function (err, message) {
    if (err) return console.error(err);

    response.send(JSON.stringify(message));
  });
});

router.delete('/:messageId', authMiddleware(), function (request, response) {
  Message.findById(request.params.messageId).remove().exec();
  response.status(204).end();
});

module.exports = router;
