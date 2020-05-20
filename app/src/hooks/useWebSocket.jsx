import { useState, useEffect } from "react";

const useWebsocket = () => {
  const [websocket, setWebsocket] = useState();
  const [websocketReady, setWebsocketReady] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomId, setRoomId] = useState();
  const [userName, setUserName] = useState();
  const [showModal, setShowModal] = useState(true);
  const [ID, setMyID] = useState();

  //Start the websocket
  useEffect(() => {
    startWebSocket();
  }, []);

  useEffect(() => {
    //Check if websocket is already instanitated
    if (websocketReady) {
      // console.log("run websocket useEffect");
      let roomURL = window.location.hash.replace("#/", "");
      let userNameLocalHost = localStorage.getItem("username");
      if (roomURL.length === 4) {
        setRoomId(roomURL);
        if (userNameLocalHost) {
          setUserName(userNameLocalHost);
          joinRoom(roomURL, userNameLocalHost);
        }
      }
    }
  }, [websocketReady]);

  const changeUsername = async (username) => {
    await setUserName(username);
    await sendUsername(userName);
    if (roomId) {
      joinRoom(roomId, userName);
    }
  };

  const joinRoom = async (roomId, userName) => {
    await sendUsername(userName);
    await apiJoinRoom(roomId);
    setUserName(userName);
    setRoomId(roomId);
    await getRoom(roomId);
    setShowModal(false);
    document.title = `${roomId} | Free Planning Poker`;
  };

  const leaveRoom = async () => {
    window.history.pushState("", "Free Planning Poker", `/`);
    await apiLeaveRoom();
    setShowModal(true);
    document.title = `Free Planning Poker`;
  };

  const startWebSocket = () => {
    const initalWebsocket = new WebSocket("wss:/api.freeplanningpoker.com");
    initalWebsocket.onopen = (evt) => {
      // console.log("onopen", evt);
      setWebsocketReady(true);
    };
    initalWebsocket.onerror = (evt) => {
      // console.log("error", evt);
      alert("Session timed out please rejoin or refresh");
    };

    initalWebsocket.onmessage = (evt) => {
      // console.log("onmessage", evt);
      // setRoomUsers(JSON.parse(evt.data));
    };

    initalWebsocket.onclose = (evt) => {
      // console.log("onclose", evt);
    };

    setWebsocket(initalWebsocket);
  };

  const apiJoinRoom = (roomId) => {
    return new Promise(function (resolve, reject) {
      websocket.send(`{"roomId": "${roomId}","action": "joinRoom"}`);
      websocket.onmessage = (evt) => {
        // console.log(evt.data)
        setMyID(evt.data);
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
        // console.log(evt.data);
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
        try {
          setRoomUsers(JSON.parse(evt.data));
        } catch (error) {
          // Join room causes this error just catching it.
          // console.log(error)
        }
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
      try {
        websocket.send(
          `{"cardNumber": "${cardNumber}","action": "sendCardNumber"}`
        );
        websocket.onmessage = function (evt) {
          // console.log(JSON.parse(evt.data));
          setRoomUsers(JSON.parse(evt.data));
          resolve();
        };
        websocket.onerror = function (err) {
          alert("Session timed out please rejoin or refresh");
          reject(err);
        };
      } catch (error) {
        alert("Session timed out please rejoin or refresh");
      }
    });
  };

  const showVotes = () => {
    return new Promise(function (resolve, reject) {
      try {
        websocket.send(`{"showVotes": true,"action": "showVotes"}`);
        websocket.onmessage = function (evt) {
          // console.log(evt.data);
          setRoomUsers(JSON.parse(evt.data));
          resolve();
        };
        websocket.onerror = function (err) {
          alert("Session timed out please rejoin or refresh");
          reject(err);
        };
      } catch (error) {
        alert("Session timed out please rejoin or refresh");
      }
    });
  };

  const clearVotes = () => {
    return new Promise(function (resolve, reject) {
      try {
        websocket.send(`{"roomId": "${roomId}","action": "clearVotes"}`);
        websocket.onmessage = function (evt) {
          // console.log(evt.data);
          setRoomUsers(JSON.parse(evt.data));
          resolve();
        };
        websocket.onerror = function (err) {
          alert("Session timed out please rejoin or refresh");
          reject(err);
        };
      } catch (error) {
        alert("Session timed out please rejoin or refresh");
      }
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
    showVotes,
    clearVotes,
    ID,
  };
};

export default useWebsocket;
