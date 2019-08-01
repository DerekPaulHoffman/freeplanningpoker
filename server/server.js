const io = require('socket.io')();

let roomsDB = {};
io.on('connection', (socket) => {
  let username = 'Anonymous';
  let usersRoom = '';
  socket.emit('connect', socket.id);
  socket.on('socketInit', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
    console.log("joining room: " + room);
    console.log("Client Id: " + socket.id);
    socket.join(room);
    usersRoom = room;
    if(roomsDB[room]){
      if(checkSessionId(socket.id, room)){
         console.log(username + ' already in room ' + room);
      } else {
        roomsDB[room].push({
          userName: username,
          sessionId: socket.id,
          message: '',
        });
      }
    } else {
      roomsDB[room] = [];
      roomsDB[room].push({
        userName: username,
        sessionId: socket.id,
        message: '',
      });
    }
    //Send out
    socket.broadcast.in(room).emit('readRoomUsers', roomsDB[room]);
    // io.in(room).clients((error, clients) => {
    //   if (error) throw error;
    //   console.log(clients);
    //   console.log(room)
    //   io.in(room).emit('readRoomUsers', clients, userName);
    // });
    // var clients = io.sockets.clients(room);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected from room' + usersRoom);
    if(roomsDB[usersRoom]){
      for (user in roomsDB[usersRoom]) {
        if(user.sessionId === socket.id) {
          console.log('splice out found sessionId');
          roomsDB[usersRoom].splice(user, 1);          
        }
      }
      if(roomsDB[usersRoom].length === 0){
        console.log(usersRoom + ' is empty removing room');
        delete roomsDB[usersRoom];
        console.log(roomsDB);
      }
    } else {
       console.log('problem with room:' + usersRoom, roomsDB);
    }
  });
  socket.on('readMessage', (newMessage, room) => {
    console.log("server chat message: ", newMessage)
    console.log("server chat room: ", room)
    io.in(room).emit('readMessage', newMessage, socket.id);
  });
});

const checkSessionId = (sessionId, room) => {
    roomsDB[room].forEach(nextRoom => {
      if(sessionId === nextRoom.sessionId) {
        return true;
      }
    });
    return false;
}

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
