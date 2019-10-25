// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useEffect, useState } from 'react';

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
  const [roomId, setRoomId] = useState();
  const [sessionId, setSessionId] = useState();
  const { showModal, setShowModal } = useModalRequirements();
  

  const createNewRoom = userName => {
    console.log("create new room", userName);
    // Gotta rng a room id and then send both the username and room number to the socket
    // Sockets.sendUsername(userName);
    setShowModal(false);
  };

  const joinExistingRoom = async (roomId, userName) => {
    // I'm not sure yet how to set my self as a certain username in a room
    await Sockets.sendUsername(userName);
    await Sockets.joinRoom(roomId);
    setShowModal(false);
  };
  

  useEffect(() => {
    Sockets.socketInit(err => {});
    let roomURL = window.location.pathname.replace("/", "");
    if (roomURL.length === 4) {
      if (localStorage.getItem("username")) {
        joinExistingRoom(roomId, localStorage.getItem("username"));
      }
    }
  }, []);

  useEffect(() => {
    Sockets.readRoomId(roomId => {
      console.log("roomId", roomId);
      setRoomId(roomId);
    });
  }, [roomId]);
  
  useEffect(() => {
      Sockets.readRoomUsers(roomUsers => {
        Sockets.getSessionId();
        setRoomUsers(roomUsers);
      });
      Sockets.setSessionId(sessionId => {
        setSessionId(sessionId);
      });
    }, [sessionId]);

  return (
    <div className="App">
      <Header roomId={roomId} />

      <CardHolder />
      {showModal && (
        <Portal>
          <div id="overlay">
            <UserInfoModal
              joinExistingRoom={joinExistingRoom}
              createNewRoom={createNewRoom}
              roomId={roomId}
            />
          </div>
        </Portal>
      )}
      <PlayingSurface roomUsers={roomUsers} sessionId={sessionId} />
    </div>
  );
}

export default App;
