var socket = io();

$('form').submit(function(){
  if($('#m').length > 0) {
    socket.emit('chat message', $('#user').val() + ': ' + $('#m').val());
    $('#m').val('');
    return false;
  }
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