var express = require('express');
var router = express.Router();
var Thread = require('../schema/thread');
var mongoose = require('mongoose');
var authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware(), function (request, response) {
  Thread.find(function (err, threads) {
    if (err) return console.error(err);

    response.send(JSON.stringify(threads));
  });
});

router.post('/', authMiddleware(), function (request, response) {
  var thread = new Thread({
    name: request.body.name,
    users: [
      request.user,
    ],
  });
  thread.save(function (err) {
    console.log(err);
  });

  response.status(201).json({
    id: thread.id,
  });
});

router.put('/:threadId', authMiddleware(), function (request, response) {
  Thread.findById(request.params.threadId, function (err, thread) {
    if (request.body.name) {
      thread.name = request.body.name;
    }

    thread.save(function (err) {
      console.log(err);
    });

    response.status(204).end();
  });
});

router.get('/:threadId', authMiddleware(), function (request, response) {
  Thread.findById(request.params.threadId, function (err, thread) {
    if (err) return console.error(err);

    response.send(JSON.stringify(thread));
  });
});

router.delete('/:threadId', authMiddleware(), function (request, response) {
  Thread.findById(request.params.threadId).remove().exec();
  response.status(204).end();
});

module.exports = router;
