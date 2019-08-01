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
    console.log("joining room: " + room);
    socket.join(room);
    io.in(room).clients((error, clients) => {
      if (error) throw error;
      console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
});
    // var clients = io.sockets.clients(room);
    // socket.broadcast.in(room).emit('readRoomUsers',clients);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('readMessage', (newMessage, room, datUser) => {
    console.log("server chat message: ",newMessage )
    console.log("server chat room: ", room)
    console.log("server chat user: ", datUser)
    socket.broadcast.in(room).emit('readMessage', newMessage, datUser);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);