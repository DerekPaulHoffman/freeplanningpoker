import React, {useState} from 'react';

import Card from "../Card/Card.jsx";


import "./PlayingSurface.scss";

const PlayingSurface = (props) => {
  const { roomUsers, sessionId } = props;
  const [showVotes, setShowVotes] = useState(false);

  const cardDimensions = { width: 2.25 * 12, height: 3.5 * 12 };

  return (
    <>
      <button onClick={() => setShowVotes(true)}>Show Votes</button>
      <ul className="playingSurface row">
        {roomUsers.map((roomUser, index) => {
          return (
            <li
              key={`playingSurface${roomUser.userName}${index}`}
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
                  <div className={`cardasd ${showVotes && "flipped"}`}>
                    <div className="front face">
                      <Card
                        key={index + 1}
                        transform={0}
                        width={`${cardDimensions.width}vw`}
                        height={`${cardDimensions.height}vw`}
                        className={`card surfaceCard ${roomUser.message &&
                          "showReady"}`}
                        cardNumber={
                          roomUser.sessionId === sessionId && roomUser.message
                        }
                        cardName={roomUser.userName}
                      />
                    </div>
                    <div className="back face">
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
