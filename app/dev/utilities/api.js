import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function registerHandler(onMessageReceived) {
socket.on('message', onMessageReceived)
}

function unregisterHandler() {
socket.off('message')
}

socket.on('error', function (err) {
console.log('received socket error:')
console.log(err)
})

function register(name, cb) {
socket.emit('register', name, cb)
}

function join(chatroomName, cb) {
socket.emit('join', chatroomName, cb)
}

function leave(chatroomName, cb) {
socket.emit('leave', chatroomName, cb)
}

function message(chatroomName, msg, cb) {
socket.emit('message', { chatroomName, message: msg }, cb)
}

function getChatrooms(cb) {
socket.emit('chatrooms', null, cb)
}

function getAvailableUsers(cb) {
socket.emit('availableUsers', null, cb)
}
