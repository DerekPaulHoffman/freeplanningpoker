const io = require('socket.io')();
let room = "abc123";
io.on('connection', (socket) => {
  socket.on('socketInit', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
    console.log("joining room: " + room);
    socket.join(room);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('readMessage', (newMessage) => {
    console.log("server chat message",newMessage )
    socket.broadcast.in(room).emit('readMessage', newMessage);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);


io.sockets.in(room).emit('readMessage', 'what is going on, party people?');