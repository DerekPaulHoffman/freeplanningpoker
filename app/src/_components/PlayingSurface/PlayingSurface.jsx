import React, {useEffect, useState} from 'react';

import Card from "../Card/Card.jsx";

//Sockets
import * as Sockets from '../../utilities/api.js';

import useSocketSessionId from '../../hooks/useSocketSessionId';

import "./PlayingSurface.scss";

const PlayingSurface = (props) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const {socketSessionId, setSocketSessionId } = useSocketSessionId();
  const [sessionId, setSessionId] = useState();
  const [showVotes, setShowVotes] = useState(false);
    
  const cardDimensions = { width: 2.25 * 12, height: 3.5 * 12 };

  useEffect(() => {
    Sockets.readRoomUsers(roomUsers => {
      Sockets.getSessionId();
      setRoomUsers(roomUsers);
    });
  }, [sessionId]);


  return (
    <>
      <button onClick={() => setShowVotes(true)}>Show Votes</button>
      <ul className="playingSurface row">
        {roomUsers.map((roomUser, index) => {
          console.log(roomUser.sessionId);
          console.log(sessionId);
          return (
            <li
              style={{
                height: `50vw`,
                order: `${
                  roomUser.sessionId === sessionId
                    ? "0"
                    : index + roomUsers.length
                }`
              }}
              className="col-xs-4"
            >
              <div className="container">
                <div className="deck">
                  <div className={`cardasd ${showVotes != "" && "flipped"}`}>
                    <div className="front face">
                      <Card
                        key={index + 1}
                        transform={0}
                        width={`${cardDimensions.width}vw`}
                        height={`${cardDimensions.height}vw`}
                        className={`card surfaceCard ${(roomUser.message) && 'showReady'}`}
                        cardNumber={
                          roomUser.sessionId === sessionId && roomUser.message
                        }
                        cardName={roomUser.userName}
                      />
                    </div>
                    <div class="back face">
                      <Card
                        key={index + 1}
                        transform={0}
                        width={`${cardDimensions.width}vw`}
                        height={`${cardDimensions.height}vw`}
                        className={`card surfaceCard`}
                        cardNumber={roomUser.message}
                        cardName={roomUser.userName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PlayingSurface;
