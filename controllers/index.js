var express = require('express');
var router = express.Router();

router.use('/api/users', require('./users'));

router.get('/', function (request, response) {
  response.sendFile('/vagrant/views/index.html');
});

module.exports = router;
