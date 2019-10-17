import React, { useEffect, useState } from 'react';

import Header from './_components/Header/Header';
import Portal from './_components/Portal/Portal';
import UserInfoModal from './_components/UserInfoModal/UserInfoModal';
import CardHolder from "./_components/CardHolder/CardHolder";

// Import the 
import * as Sockets from './utilities/api.js';
// Styles
import './styles/App.scss';

const App = () => {
  const [timestamp, setTimestamp] = useState(0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    Sockets.socketInit((err, timestamp) => {
      console.log(timestamp);
      setTimestamp(timestamp);
    });
  }, [timestamp]);

  const createNewRoom = (userName) => {
    console.log('create new room', userName);

    // Gotta rng a room id and then send both the username and room number to the socket

    // Sockets.sendUsername(userName);
    setShowModal(false);
  }

  const joinExistingRoom = async (roomId, userName) => {
    console.log(roomId, userName);
    // I'm not sure yet how to set my self as a certain username in a room
    await Sockets.sendUsername(userName);
    await Sockets.joinRoom(roomId);
    setShowModal(false);
  }

  return (
    <div className="App">
      <Header />
      {(showModal) && (
        <Portal>
          <UserInfoModal 
            createNewRoom={createNewRoom}
            joinExistingRoom={joinExistingRoom}
          />
        </Portal>
      )}
      <CardHolder />
    </div>
  );
}

export default App;
