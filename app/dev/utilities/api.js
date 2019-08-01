import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');
var roomMembers = [];
function socketInit(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('socketInit', 1000);
}

function sendMessage(ourMessage, room, datUser) {
  socket.emit('readMessage', ourMessage, room, datUser);
}
function readMessage(ourMessage, datUser) {
  socket.on('readMessage', ourMessage, datUser);
}

function joinRoom(room) {
  socket.emit('room', room);
}
function readRoomUsers(users) {
  socket.on('readRoomUsers', users);
}

export { socketInit, sendMessage, readMessage, joinRoom, readRoomUsers }