const io = require('socket.io')();
io.on('connection', (socket) => {
  socket.on('socketInit', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
    socket.join(room);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('readMessage', (newMessage) => {
    console.log("server chat message",newMessage )
    socket.broadcast.emit('readMessage', newMessage);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);


let room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');