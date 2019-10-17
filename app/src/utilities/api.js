import openSocket from 'socket.io-client';

import { localEnvCheck } from './env.js';

const socket = (localEnvCheck()) ? openSocket('http://localhost:8000') : openSocket('http://ec2-13-59-76-90.us-east-2.compute.amazonaws.com:8000');
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
function readRoomUsers(users) {
  console.log("readRoomUsers API", users);
  socket.on('readRoomUsers', users);
}

export { socketInit, sendMessage, readMessage, joinRoom, readRoomUsers, getSessionId, sendUsername, getRoom }