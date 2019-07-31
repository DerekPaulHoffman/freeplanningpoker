import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function sendMessage(ourMessage) {
  socket.emit('readMessage', ourMessage);
}
function readMessage(ourMessage) {
  socket.on('readMessage', ourMessage);
}

export { subscribeToTimer, sendMessage, readMessage }