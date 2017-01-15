var express = require('express');
var passport = require('passport');
var router = express.Router();
var authMiddleware = require('../middleware/auth');

var User = require('../schema/user');

router.use('/api/users', require('./users'));
router.use('/api/threads/:threadId/messages', require('./messages'));
router.use('/api/threads', require('./threads'));
router.use('/', require('./login'));

router.get('/', authMiddleware(), function (request, response) {
  response.sendFile('/vagrant/views/index.html');
});

module.exports = router;
