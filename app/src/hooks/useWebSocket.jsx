import { useState, useEffect } from "react";

const useWebsocket = () => {
  const [websocket, setWebsocket] = useState();
  const [websocketReady, setWebsocketReady] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomId, setRoomId] = useState();
  const [userName, setUserName] = useState();
  const [showModal, setShowModal] = useState(true);

  //Start the websocket
  useEffect(() => {
      startWebSocket();
  }, []);

  const changeUsername = (username) => {
    setUserName(username);
  };

  const joinRoom = async (roomId, userName) => {
    await sendUsername(userName);
    await apiJoinRoom(roomId);
    setUserName(userName);
    setRoomId(roomId);
    await getRoom(roomId);
    setShowModal(false);
  };

  const leaveRoom = async () => {
    window.history.pushState("", "Free Planning Poker", `/`);
    await apiLeaveRoom();
    setShowModal(true);
  };

  useEffect(() => {
    //Check if websocket is already instanitated
    if (websocketReady) {
      // console.log("run websocket useEffect");
      let roomURL = window.location.hash.replace("#/", "");
      let userNameLocalHost = localStorage.getItem("username");
      if (roomURL.length === 4) {
        // setRoomId(roomURL);
        if (userNameLocalHost) {
          setUserName(userNameLocalHost);
          joinRoom(roomURL, userNameLocalHost);
        }
      }
    }
  }, [websocketReady]);

  useEffect(() => {
    console.log("new room users");
  }, [roomUsers]);


  const startWebSocket = () => {
      const initalWebsocket = new WebSocket("wss:/api.freeplanningpoker.com");
      initalWebsocket.onopen = (evt) => {
        console.log("onopen", evt);
        setWebsocketReady(true);
      };
      initalWebsocket.onerror = (evt) => {
        console.log("error", evt);
        alert("Session timed out please rejoin or refresh");
      };

      initalWebsocket.onmessage = (evt) => {
        console.log("onmessage", evt);
        setRoomUsers(JSON.parse(evt.data));
      };

      initalWebsocket.onclose = (evt) => {
        console.log("onclose", evt);
      };
      
    setWebsocket(initalWebsocket);
  };

  const apiJoinRoom = (roomId) => {
    return new Promise(function (resolve, reject) {
      websocket.send(`{"roomId": "${roomId}","action": "joinRoom"}`);
      websocket.onmessage = (evt) => {
        // console.log(evt.data)
        resolve(evt.data);
      };
      websocket.onerror = (err) => {
        alert("Session timed out please rejoin or refresh");
        reject(err);
      };
    });
  };

  const apiLeaveRoom = () => {
    return new Promise(function (resolve, reject) {
      websocket.send(`{"roomId": "No Room","action": "joinRoom"}`);
      websocket.onmessage = (evt) => {
        // console.log(evt.data)
        resolve(evt.data);
      };
      websocket.onerror = (err) => {
        alert("Session timed out please rejoin or refresh");
        reject(err);
      };
    });
  };

  const sendUsername = (username) => {
    return new Promise(function (resolve, reject) {
      websocket.send(`{"username": "${username}","action": "changeUsername"}`);
      websocket.onmessage = function (evt) {
        console.log(evt.data);
        resolve(evt.data);
      };
      websocket.onerror = function (err) {
        alert("Session timed out please rejoin or refresh");
        reject(err);
      };
    });
  };

  const getRoom = (roomId) => {
    return new Promise(function (resolve, reject) {
      websocket.send(`{"roomId": "${roomId}","action": "getRoom"}`);
      websocket.onmessage = function (evt) {
        console.log(`Get Room: ${evt.data}`);
        setRoomUsers(JSON.parse(evt.data));
        resolve();
      };
      websocket.onerror = function (err) {
        alert("Session timed out please rejoin or refresh");
        reject(err);
      };
    });
  };

  const sendCardNumber = (cardNumber) => {
    return new Promise(function (resolve, reject) {
      websocket.send(
        `{"cardNumber": "${cardNumber}","action": "sendCardNumber"}`
      );
      websocket.onmessage = function (evt) {
        console.log(evt.data);
        setRoomUsers(JSON.parse(evt.data));
        resolve();
      };
      websocket.onerror = function (err) {
        alert("Session timed out please rejoin or refresh");
        reject(err);
      };
    });
  };

  return {
    websocket,
    startWebSocket,
    roomUsers,
    setRoomUsers,
    roomId,
    setRoomId,
    userName,
    sendCardNumber,
    setUserName,
    getRoom,
    changeUsername,
    leaveRoom,
    joinRoom,
    showModal,
  };
};

export default useWebsocket;
