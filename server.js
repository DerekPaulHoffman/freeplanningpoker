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
  socket.on('getSessionId', function () {
    console.log('getSessionId', socket.id)
    socket.emit('setSessionId', socket.id);
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
          showVotes: false,
        });
      }
    } else {
      console.log('New Room ' + room +' set username: ' + username);
      roomsDB[room] = [];
      roomsDB[room].push({
        userName: username,
        sessionId: socket.id,
        message: '',
        showVotes: false,
      });
    }
    //Send out
    for(user in roomsDB[room]) {
      console.log(roomsDB[room][user]);
    }
    io.in(room).emit('readRoomUsers', roomsDB[room]);
    io.in(room).emit('readRoomId', room);
  });
  socket.on('getroom', function(){
    io.in(room).emit('readRoomId', usersRoom);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected from room' + usersRoom);
    if(roomsDB[usersRoom]){
      console.log("found room:"+ usersRoom);
      for (user in roomsDB[usersRoom]) {
        console.log('username: ' + roomsDB[usersRoom][user].userName);
        if(roomsDB[usersRoom][user].sessionId === socket.id) {
          console.log('splice out found sessionId');
          roomsDB[usersRoom].splice(user, 1);
          io.in(usersRoom).emit('readRoomUsers', roomsDB[usersRoom]);
        }
      }
      if(roomsDB[usersRoom].length === 0){
        console.log(usersRoom + ' is empty removing room');
        delete roomsDB[usersRoom];
        console.log(roomsDB);
      }

      socket.leave(usersRoom);
      usersRoom = '';  
    } else {
       console.log('problem with room:' + usersRoom, roomsDB);
    }
  });
  socket.on('leaveRoom', function () {
    console.log('user left from room: ' + usersRoom);
    if (roomsDB[usersRoom]) {
      console.log("found room:" + usersRoom);
      for (user in roomsDB[usersRoom]) {
        console.log('username: ' + roomsDB[usersRoom][user].userName);
        console.log('roomsDB[usersRoom][user].sessionId' + roomsDB[usersRoom][user].sessionId);
        if (roomsDB[usersRoom][user].sessionId === socket.id) {
          console.log('splice out found sessionId');
          roomsDB[usersRoom].splice(user, 1);
        }
      }
      if (roomsDB[usersRoom].length === 0) {
        console.log(usersRoom + ' is empty removing room');
        delete roomsDB[usersRoom];
        io.in(usersRoom).emit('readRoomUsers', []);
      } else {
        io.in(usersRoom).emit('readRoomUsers', roomsDB[room]);
      }

      io.in(usersRoom).emit('readRoomId', '');
      socket.leave(usersRoom);    
      usersRoom = '';    
    } else {
      console.log('problem with room:' + usersRoom, roomsDB);
    }
  });
  socket.on('readMessage', (newMessage) => {
    console.log("server chat message: ", newMessage)
    console.log("server chat room: ", usersRoom)
    console.log("socket.id: ", socket.id)
    console.log(roomsDB[usersRoom])
    for (user in roomsDB[usersRoom]) {
      console.log("roomsDB[usersRoom][person].sessionId: ", roomsDB[usersRoom][user].sessionId)
        if(roomsDB[usersRoom][user].sessionId === socket.id) {
          roomsDB[usersRoom][user].message = newMessage;
        }
    }
    io.in(usersRoom).emit('readRoomUsers', roomsDB[usersRoom]);
  });
  socket.on('showVotes', () => {
    for (user in roomsDB[usersRoom]) {
      console.log("User " + roomsDB[usersRoom][user].userName +" Wanted To Show Votes")
      if (roomsDB[usersRoom][user].sessionId === socket.id) {
        roomsDB[usersRoom][user].showVotes = true;
      } else {
        roomsDB[usersRoom][user].showVotes = false;
      }
    }
    io.in(usersRoom).emit('readRoomUsers', roomsDB[usersRoom]);
  });
  socket.on('clearVotes', () => {
    console.log("Clear Votes")
    for (user in roomsDB[usersRoom]) {
        roomsDB[usersRoom][user].message = '';
        roomsDB[usersRoom][user].showVotes = '';
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
