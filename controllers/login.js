var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function (request, response) {
  response.sendFile('/vagrant/views/login.html');
});

router.post('/login', passport.authenticate(
  'local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
  }
));

router.get('/logout', function (request, response) {
  request.logout();
  response.redirect('/login');
});

router.get('/register', function (request, response) {
  response.sendFile('/vagrant/views/register.html');
});

router.post('/register', function (request, response) {
  User.register(new User(
    { username: request.body.username }),
    request.body.password,
    function  (err, user) {
      if (err) {
        response.sendFile('/vagrant/views/register.html');
      }

      passport.authenticate('local')(request, response, function () {
        response.redirect('/');
      });
    }
  );
});

module.exports = router;
