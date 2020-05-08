// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useEffect, useState } from "react";

import Header from './_components/Header/Header';
import Portal from './_components/Portal/Portal';
import UserInfoModal from './_components/UserInfoModal/UserInfoModal';
import CardHolder from "./_components/CardHolder/CardHolder";
import PlayingSurface from "./_components/PlayingSurface/PlayingSurface";

// Hooks
import useWebSocket from "./hooks/useWebSocket";

// Styles
import './styles/App.scss';
import './styles/Common.scss';

const App = () => {
  const {
    websocket,
    roomUsers,
    roomId,
    userName,
    changeUsername,
    leaveRoom,
    joinRoom,
    sendCardNumber,
    showModal,
  } = useWebSocket();
 

  return (
    <div className="App">
      <Header
        roomId={roomId}
        userName={userName}
        leaveRoom={leaveRoom}
        changeUsername={changeUsername}
      />
      <CardHolder websocket={websocket} sendUpNewCards={sendCardNumber} />
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
      <PlayingSurface roomUsers={roomUsers} />
    </div>
  );
}

export default App;
