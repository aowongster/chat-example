var socket = io();

// on dom ready
$(function(){
  $('#user').val('person' + Math.floor(Math.random() * 100));
});


$('form').submit(function(){
  if($('#m').val().length) {
    socket.emit('chat message', $('#user').val() + ': ' + $('#m').val());
    $('#m').val('');
  }
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('join', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('left', function(msg){
  $('#messages').append($('<li>').text(msg));
});