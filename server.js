require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var assert = require('assert');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan'); //logging
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var controllers = require('./controllers');
var sockets = require('./sockets');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_ADDRESS);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// parse application/json
app.use(bodyParser.json());

//parse url params
app.use(bodyParser.urlencoded({ extended: false }));

//session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

//cookies
app.use(cookieParser());

//set up passport got login
app.use(passport.initialize());
app.use(passport.session());

var User = require('./schema/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//expose public directory
app.use(express.static('public'));

//set up logging
var logFileStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('dev', {
  stream: logFileStream,
}));

app.use(controllers);

//wait for the database connection before running server
db.once('open', function () {
  sockets(http);

  http.listen(process.env.PORT, process.env.ADDRESS);
  console.log(
    'Server running at http://' +
    process.env.ADDRESS +
    ':' +
    process.env.PORT +
    '/'
  );
});
