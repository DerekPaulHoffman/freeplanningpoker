const io = require('socket.io')();
io.on('connection', (socket) => {
  socket.emit('connect', socket.id);
  socket.on('socketInit', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room, userName) {
    console.log("joining room: " + room);
    console.log("Client Id: " + socket.id);
    socket.join(room);
    io.in(room).clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
      console.log(room)
      io.in(room).emit('readRoomUsers', clients, userName);
    });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('readMessage', (newMessage, room) => {
    console.log("server chat message: ",newMessage )
    console.log("server chat room: ", room)
    io.in(room).emit('readMessage', newMessage, socket.id);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);