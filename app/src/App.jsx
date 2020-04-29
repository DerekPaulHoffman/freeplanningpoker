// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useEffect, useState } from "react";

import Header from './_components/Header/Header';
import Portal from './_components/Portal/Portal';
import UserInfoModal from './_components/UserInfoModal/UserInfoModal';
import CardHolder from "./_components/CardHolder/CardHolder";
import PlayingSurface from "./_components/PlayingSurface/PlayingSurface";

// Hooks
import useModalRequirements from './hooks/useModalRequirements';

// APIs
import * as Sockets from './utilities/api.js';
// Styles
import './styles/App.scss';
import './styles/Common.scss';

const App = () => {
  const [roomUsers, setRoomUsers] = useState([]);
  const [websocket, setWebsocket] = useState();
  const [roomId, setRoomId] = useState();
  const [userName, setUserName] = useState();
  const [sessionId, setSessionId] = useState();
  const { showModal, setShowModal } = useModalRequirements();
 
  

  const changeUsername = (username) => {
    setUserName(username);
  };


  const joinRoom = async (roomId, userName) => {
    setUserName(userName);
    await Sockets.sendUsername(websocket, userName);
    await Sockets.joinRoom(websocket, roomId);
    setShowModal(false);
    
};

  const leaveRoom = async () => {
    window.history.pushState("", "Free Planning Poker", `/`);
    await Sockets.leaveRoom(websocket);
    setShowModal(true);
  };

  const initWebSocket = async () => {
    const newWebsocketResponse = await Sockets.startWebSocket();  
    console.log(newWebsocketResponse);
    setWebsocket(newWebsocketResponse);
  }

  useEffect(() => {
    //Check if websocket is already instanitated
    if(websocket) {
      let roomURL = window.location.hash.replace("#/", "");
      let userNameLocalHost = localStorage.getItem("username");
      if (roomURL.length === 4) {
        setRoomId(roomURL);
        if (userNameLocalHost) {
          console.log("LETS JOIN!");
          setUserName(userNameLocalHost);
          console.log(roomURL, userNameLocalHost);
          joinRoom(roomURL, userNameLocalHost);
        }
      }
    }
  }, [websocket]);

  //Start the websocket
  useEffect(() => {
    initWebSocket();
  }, []);

  // useEffect(() => {
  //   Sockets.readRoomId(roomId => {
  //     console.log("roomId", roomId);
  //     setRoomId(roomId);
  //   });
  // }, [roomId]);
  
  // useEffect(() => {
  //     Sockets.readRoomUsers(roomUsers => {
  //       console.log(roomUsers);
  //       Sockets.getSessionId();
  //       setRoomUsers(roomUsers);
  //     });
  //     Sockets.setSessionId(sessionId => {
  //       setSessionId(sessionId);
  //     });
  //   }, [sessionId]);

  return (
    <div className="App">
      <Header
        roomId={roomId}
        userName={userName}
        leaveRoom={leaveRoom}
        changeUsername={changeUsername}
      />

      <CardHolder />
      {showModal && (
        <Portal>
          <div id="overlay">
            <UserInfoModal
              joinRoom={joinRoom}
              roomId={roomId}
              changeUsername={changeUsername}
            />
          </div>
        </Portal>
      )}
      <PlayingSurface roomUsers={roomUsers} sessionId={sessionId} />
    </div>
  );
}

export default App;
