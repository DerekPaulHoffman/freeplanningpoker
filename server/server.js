const io = require('socket.io')();
let roomsDB = {};
io.on('connection', (socket) => {
  let username = 'Anonymous';
  let usersRoom = '';
  socket.emit('connect', socket.id);
  socket.on('sendUsername', function(incommingUserName) {
      console.log('setUsername to: ', incommingUserName);
      username = incommingUserName;
  });
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
    console.log("joining room: " + room);
    console.log("Client Id: " + socket.id);
    console.log("Username: " + username);
    socket.join(room);
    usersRoom = room;
    if(roomsDB[room]){
      if(checkSessionId(socket.id, room)){
         console.log(username + ' already in room ' + room);
      } else {
        console.log('Room ' + room +' exists set username: ' + username);
        roomsDB[room].push({
          userName: username,
          sessionId: socket.id,
          message: '',
        });
      }
    } else {
      console.log('New Room ' + room +' set username: ' + username);
      roomsDB[room] = [];
      roomsDB[room].push({
        userName: username,
        sessionId: socket.id,
        message: '',
      });
    }
    //Send out
    for(person in roomsDB[room]) {
      console.log(roomsDB[room][person]);
    }
    io.in(room).emit('readRoomUsers', roomsDB[room]);
  });
  socket.on('getroom', function(room){
    console.log('getroomserver', room)
    io.in(room).emit('readRoomUsers', roomsDB[room]);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected from room' + usersRoom);
    console.log('usersocket.id' + socket.id);
    if(roomsDB[usersRoom]){
      console.log("found room:"+ usersRoom);
      for (user in roomsDB[usersRoom]) {
      console.log('roomsDB[usersRoom][person].sessionId' + roomsDB[usersRoom][person].sessionId);
        if(roomsDB[usersRoom][person].sessionId === socket.id) {
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
  socket.on('readMessage', (newMessage) => {
    console.log("server chat message: ", newMessage)
    console.log("server chat room: ", usersRoom)
    for (user in roomsDB[usersRoom]) {
        if(roomsDB[usersRoom][person].sessionId === socket.id) {
          roomsDB[usersRoom][person].message = newMessage;
        }
      }
    io.in(usersRoom).emit('readRoomUsers', roomsDB[usersRoom]);
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
