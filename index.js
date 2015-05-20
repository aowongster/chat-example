/*jslint node: true */

var app = require('express')();
var express = require('express');
var debug = require('debug')('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

io.on('connection', function(socket){

  debug('a user connected');
  socket.broadcast.emit('join', 'A new user has joined the chat.');

  socket.on('disconnect', function(){
    debug('user disconnected');
    io.emit('left','A old user has left the chat.');
  });

  // chat is received // do some user parsing
  socket.on('chat message', function(user, msg){
    if(msg.length) {
      socket.broadcast.emit('chat message', user, msg);
      debug('message received: ' + msg);
    }
  });
});

http.listen(3000, function(){
  debug('listening on *:3000');
});
