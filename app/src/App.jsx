import React, { useEffect, useState } from 'react';

import Header from './_components/Header/Header';
import Portal from './_components/Portal/Portal';
import UserInfoModal from './_components/UserInfoModal/UserInfoModal';

// Import the 
import * as Sockets from './utilities/api.js';
// Styles
import './styles/App.scss';

const App = () => {
  const [timestamp, setTimestamp] = useState(0);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    Sockets.socketInit((err, timestamp) => {
      setTimestamp(timestamp);
    });
  }, [timestamp]);

  return (
    <div className="App">
      <Header />
      {(showModal) && (
        <Portal>
          <UserInfoModal />
        </Portal>
      )}
    </div>
  );
}

export default App;
