var express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

//expose public directory
app.use(express.static('public'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat.message', function(data) {
        console.log('message: ' + data);
        io.emit('chat.message', data);
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(80, '192.168.33.10');
console.log('Server running at http://192.168.33.10:80/');
