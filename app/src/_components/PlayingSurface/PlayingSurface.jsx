import React, { useState, useEffect } from "react";

import Card from "../Card/Card.jsx";

import "./PlayingSurface.scss";

const PlayingSurface = ({ roomUsers, ID, showVotesApi, clearVotes }) => {
  const [showVotes, setShowVotes] = useState(false);

  const cardDimensions = { width: 2.25 * 12, height: 3.5 * 12 };

  const changeVoteToggle = () => {
    if (showVotes) {
      clearVotes();
    } else {
      showVotesApi();
    }
  };

  useEffect(() => {
    for (let roomUser of roomUsers) {
      if (roomUser.showVotes) {
        setShowVotes(true);
        break;
      }
      setShowVotes(false);
    }
  }, [roomUsers]);

  return (
    <>
      <div className="playingBackground">
        <div className="onoffswitch">
          <input
            type="checkbox"
            name="onoffswitch"
            className="onoffswitch-checkbox"
            id="myonoffswitch"
            checked={showVotes}
            onClick={showVotesApi}
            onChange={changeVoteToggle}
          />
          <label className="onoffswitch-label" htmlFor="myonoffswitch">
            <span className="onoffswitch-inner"></span>
            <span className="onoffswitch-switch"></span>
          </label>
        </div>
        <ul className="playingSurface row">
          {roomUsers.map((roomUser, index) => {
            return (
              <li
                key={`playingSurface${roomUser.username}${index}`}
                style={{
                  height: `50vw`,
                  order: `${
                    roomUser.ID === ID ? "0" : index + roomUsers.length
                  }`,
                }}
                className="col-xs-4"
              >
                <div className="container">
                  <div className="deck">
                    <div className={`fullCard ${showVotes && "flipped"}`}>
                      <div className="front face">
                        <Card
                          key={index + 1}
                          transform={0}
                          width={`${cardDimensions.width}vw`}
                          height={`${cardDimensions.height}vw`}
                          className={`card surfaceCard ${
                            roomUser.cardNumber && "showReady"
                          }`}
                          cardNumber={roomUser.ID === ID && roomUser.cardNumber}
                          cardName={
                            roomUser.ID === ID ? "Me" : roomUser.username
                          }
                        />
                      </div>
                      <div className="back face">
                        <Card
                          key={index + 1}
                          transform={0}
                          width={`${cardDimensions.width}vw`}
                          height={`${cardDimensions.height}vw`}
                          className={`card surfaceCard`}
                          cardNumber={roomUser.cardNumber}
                          cardName={roomUser.username}
                          showVotes={
                            roomUser.showVotes && "I clicked the button"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default PlayingSurface;
