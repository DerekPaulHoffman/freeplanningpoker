import openSocket from 'socket.io-client';
const socket = openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');
let sessionId = '';

function socketInit(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('socketInit', 1000);
  socket.on('connect', () => {
    console.log(" socket.id: " + socket.id)
    sessionId = socket.id;
  });
}

function getSessionId() {
  return sessionId;
}

function sendMessage(ourMessage, room) {
  socket.emit('readMessage', ourMessage, room);
}
function readMessage(ourMessage, socketID) {
  socket.on('readMessage', ourMessage, socketID);
}

function joinRoom(room, userName) {
  socket.emit('room', room, userName);
}
function readRoomUsers(users, userName) {
  console.log("readRoomUsers", users);
  socket.on('readRoomUsers', users, userName);
}

export { socketInit, sendMessage, readMessage, joinRoom, readRoomUsers, getSessionId }
