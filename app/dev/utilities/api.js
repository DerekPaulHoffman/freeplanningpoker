import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');

function socketInit(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('socketInit', 1000);
}

function sendMessage(ourMessage, room='1234') {
  socket.emit('readMessage', ourMessage, room);
}
function readMessage(ourMessage) {
  socket.on('readMessage', ourMessage);
}

function joinRoom(room) {
  socket.emit('room', room);
}

export { socketInit, sendMessage, readMessage, joinRoom }