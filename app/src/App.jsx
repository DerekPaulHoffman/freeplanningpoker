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
  const [ID, setID] = useState();
  const { showModal, setShowModal } = useModalRequirements();
 
  

  const changeUsername = (username) => {
    setUserName(username);
  };


  const joinRoom = async (roomId, userName) => {
    await Sockets.sendUsername(websocket, userName);
    setID(await Sockets.joinRoom(websocket, roomId));
    setUserName(userName);
    setRoomId(roomId);
    setRoomUsers(await Sockets.getRoom(websocket, roomId));
    // console.log(await Sockets.getRoom(websocket, roomId));
    setShowModal(false);
    
};

  const leaveRoom = async () => {
    window.history.pushState("", "Free Planning Poker", `/`);
    await Sockets.leaveRoom(websocket);
    setShowModal(true);
  };

  const initWebSocket = async () => {
    const newWebsocketResponse = await Sockets.startWebSocket();  
    // console.log(newWebsocketResponse);
    setWebsocket(newWebsocketResponse);
  }

  useEffect(() => {
    //Check if websocket is already instanitated
    if(websocket) {
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
  }, [websocket]);

  //Start the websocket
  useEffect(() => {
    initWebSocket();
  }, []);


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
      <PlayingSurface roomUsers={roomUsers} ID={ID} />
    </div>
  );
}

export default App;
