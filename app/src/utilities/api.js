import openSocket from 'socket.io-client';

import { localEnvCheck } from './env.js';

const socket = (localEnvCheck()) ? openSocket('http://localhost:8000') : openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');

function socketInit(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('socketInit', 1000);
  socket.on('connect', () => {
  });
}

function getSessionId() {
  socket.emit('getSessionId');
}
function setSessionId(ourMessage) {
  socket.on('setSessionId', ourMessage);
}

function sendMessage(ourMessage, room) {
  socket.emit('readMessage', ourMessage, room);
}
function readMessage(ourMessage) {
  socket.on('readMessage', ourMessage);
}

function sendUsername(userName) {
  socket.emit('sendUsername', userName);
}

function joinRoom(room) {
  socket.emit('room', room);
}
function getRoom(room) {
  console.log('getroom', room)
  socket.emit('getroom', room);
}
function readRoomId(roomId) {
  socket.on('readRoomId', roomId);
}
function readRoomUsers(users) {
  socket.on('readRoomUsers', users);
}

export { socketInit, sendMessage, readMessage, joinRoom, readRoomUsers, getSessionId, setSessionId, sendUsername, getRoom, readRoomId }
