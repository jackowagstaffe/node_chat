require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoUrl = process.env.MONGO_ADDRESS;

var controllers = require('./controllers');
var sockets = require('./sockets');

// parse application/json
app.use(bodyParser.json());

//expose public directory
app.use(express.static('public'));

app.use(controllers);

// app.get('/put', function (request, response) {
//   MongoClient.connect(mongoUrl, function (err, db) {
//     if (err) {
//       return console.dir(err);
//     }
//
//     var collection  = db.collection('test');
//     collection.insert({
//       name: 'hello',
//       password: 'password',
//     });
//   });
//
//   response.send('lol');
// });
//
// app.get('/get', function (request, response) {
//   MongoClient.connect(mongoUrl, function (err, db) {
//     if (err) { return console.dir(err); }
//
//     var collection = db.collection('test');
//     var data = collection.find({ name: 'hello' }).toArray(function (err, items) {
//       console.log(items);
//
//       response.write('lol');
//       response.end();
//     });
//   });
// });

sockets(http);

http.listen(process.env.PORT, process.env.ADDRESS);
console.log('Server running at http://' + process.env.ADDRESS + ':' + process.env.PORT + '/');
