var express = require('express')
var app = express()
var http = require('http').Server(app);

//expose public directory
app.use(express.static('public'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/views/index.html');
});

http.listen(80, '192.168.33.10');
console.log('Server running at http://192.168.33.10:80/');
