// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState } from "react";
import { Swipeable } from "react-swipeable";

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
    showVotes,
    clearVotes,
    ID,
  } = useWebSocket();

  const [messageBoardVisible, moveMessageBoard] = useState(false);

  
  const config = {
    onSwipedLeft: () => {
      console.log("left")
      moveMessageBoard(true);
    },
    onSwipedRight: () => {
      console.log("right")
      moveMessageBoard(false);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  };
 

  return (
    <div className="App">
      <Header
        roomId={roomId}
        userName={userName}
        leaveRoom={leaveRoom}
        changeUsername={changeUsername}
      />
      <div className={`mainArea ${messageBoardVisible ? "showMessage" : ""}`}>
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
        <Swipeable {...config}>
          <PlayingSurface
            roomUsers={roomUsers}
            showVotesApi={showVotes}
            clearVotes={clearVotes}
            ID={ID}
          />
          <div className="messageBoard">
            <p>First Message</p>
            <input type="text" name="Write Here" />
          </div>
        </Swipeable>
      </div>
    </div>
  );
}

export default App;
