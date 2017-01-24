(function() {
  var socket = io();

// on dom ready
  $(function(){
    $('#user').val('person' + Math.floor(Math.random() * 100));
  });

//TODO do some client side input form parsing
  $('form').submit(function(){
    if($('#m').val().length) {
      var user = $('#user').val();
      var msg = $('#m').val();

      socket.emit('chat message', user , msg);
      user = "you";

      // have to append our own element
      // TODO refactor chat append code, keep it dry
      var $msg = "<span><strong>" +user+ "</strong>: "+msg+"</span>";
      $('#messages').append($('<li>').html($msg));

      // clear input
      $('#m').val('');
    }
    return false;
  });

  socket.on('chat message', function(user, msg){
    var $msg = "<span><strong>"+user+"</strong> "+msg+"</span>";
    $('#messages').append($('<li>').html($msg));
  });

  socket.on('join', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('left', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

})();
