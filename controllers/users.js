var express = require('express');
var router = express.Router();
var User = require('../schema/user');
var mongoose = require('mongoose');
var authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware(), function (request, response) {
  User.find(function (err, users) {
    if (err) return console.error(err);

    response.send(JSON.stringify(users));
  });
});

router.post('/', authMiddleware(), function (request, response) {
  var user = new User({
    username: request.body.username,
    password: request.body.password,
    admin: false,
    description: request.body.description,
  });
  user.save(function (err) {
    console.log(err);
  });

  response.status(201).json({
    id: user.id,
  });
});

router.put('/:userId', authMiddleware(), function (request, response) {
  User.findById(request.params.userId, function (err, user) {
    if (request.body.username) {
      user.username = request.body.username;
    }

    if (request.body.password) {
      user.password = request.body.password;
    }

    if (request.body.description) {
      user.description = request.body.description;
    }

    user.save(function (err) {
      console.log(err);
    });

    response.status(204).end();
  });
});

router.get('/:userId', authMiddleware(), function (request, response) {
  User.findById(request.params.userId, function (err, user) {
    if (err) return console.error(err);

    response.send(JSON.stringify(user));
  });
});

router.delete('/:userId', authMiddleware(), function (request, response) {
  User.findById(request.params.userId).remove().exec();
  response.status(204).end();
});

module.exports = router;
