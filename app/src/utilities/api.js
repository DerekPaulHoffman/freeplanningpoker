const startWebSocket = () => {
  return new Promise(function (resolve, reject) {
     const websocket = new WebSocket(
       "wss:/api.freeplanningpoker.com"
     );

    websocket.onopen = (evt) => {
      console.log("onopen", evt);
      resolve(websocket);
    };
    websocket.onerror = (evt) => {
      console.log("error", evt);
      reject(evt);
    };
    
    websocket.onmessage = (evt) => {
      console.log("onmessage", evt);
    };
    
    websocket.onclose = (evt) => {
      console.log("onclose", evt);
    };
  });
 
}

const joinRoom = (websocket, roomId) => {
  return new Promise(function (resolve, reject) {
    // console.log("join room", websocket);
    websocket.send(`{"roomId": "${roomId}","action": "joinRoom"}`);
    websocket.onmessage = (evt) => {
      // console.log(evt.data)
      resolve(evt.data);
    };
    websocket.onerror = (err) => {
      reject(err);
    };
  });
}

const leaveRoom = (websocket) => {
  return new Promise(function (resolve, reject) {
    // console.log("leave room", websocket);
    websocket.send(`{"roomId": "No Room","action": "joinRoom"}`);
    websocket.onmessage = (evt) => {
      // console.log(evt.data)
      resolve(evt.data);
    };
    websocket.onerror = (err) => {
      reject(err);
    };
  });
}

const sendUsername = (websocket, username) => {
  return new Promise(function (resolve, reject) {
    console.log("sendUsername", websocket);
    websocket.send(`{"username": "${username}","action": "changeUsername"}`);
    websocket.onmessage = function (evt) {
      console.log(evt.data)
      resolve(evt.data);
    };
    websocket.onerror = function (err) {
      reject(err);
    };
  });
};

const getRoom = (websocket, roomId) => {
  return new Promise(function (resolve, reject) {
    console.log("getRoom", websocket);
    websocket.send(`{"roomId": "${roomId}","action": "getRoom"}`);
    websocket.onmessage = function (evt) {
      console.log(evt.data)
      resolve(JSON.parse(evt.data));
    };
    websocket.onerror = function (err) {
      reject(err);
    };
  });
};

export { startWebSocket, joinRoom, sendUsername, leaveRoom, getRoom };
