var express = require('express');
var router = express.Router();
var User = require('../schema/user');
var mongoose = require('mongoose');

router.get('/', function (request, response) {
  mongoose.connect(process.env.MONGO_ADDRESS);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    User.find(function (err, users) {
      if (err) return console.error(err);
      console.log(users);

      mongoose.disconnect();
      response.send(JSON.stringify(users));
    });
  });
});

router.post('/', function (request, response) {
  mongoose.connect(process.env.MONGO_ADDRESS);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    var user = new User({
      username: request.body.username,
      password: request.body.password,
      admin: false,
      description: request.body.description,
    });
    user.save(function (err) {
      console.log(err);
    });

    mongoose.disconnect();
    res.status(201).end();
  });

});

module.exports = router;
