import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');

function socketInit(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('socketInit', 1000);
  socket.on('connect', function() {
    // Connected, let's sign-up for to receive messages for this room
    var room = "abc123";
    socket.emit('room', room);
 });
}

function sendMessage(ourMessage) {
  socket.emit('readMessage', ourMessage);
}
function readMessage(ourMessage) {
  socket.on('readMessage', ourMessage);
}

export { socketInit, sendMessage, readMessage }