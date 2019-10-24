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
  const [timestamp, setTimestamp] = useState(0);  
  const { showModal, setShowModal } = useModalRequirements();


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
    // I'm not sure yet how to set my self as a certain username in a room
    await Sockets.sendUsername(userName);
    await Sockets.joinRoom(roomId);
    setShowModal(false);
  }

  return (
    <div className="App">
      <Header />
      
      <CardHolder />
      {(showModal) && (
        <Portal>
          <div id="overlay">
            <UserInfoModal 
              joinExistingRoom={joinExistingRoom}
              createNewRoom={createNewRoom}
            />
          </div>
        </Portal>
      )}
      <PlayingSurface />
      <CardHolder />
    </div>
  );
}

export default App;
