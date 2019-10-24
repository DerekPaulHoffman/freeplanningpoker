import React, {useEffect, useState} from 'react';

import Card from "../Card/Card.jsx";

//Sockets
import * as Sockets from '../../utilities/api.js';

import "./PlayingSurface.scss";

const PlayingSurface = (props) => {
  const [roomUsers, setRoomUsers] = useState([]);
    
  const cardDimensions = { width: 2.25 * 12, height: 3.5 * 12 };

  useEffect(() => {
     Sockets.readRoomUsers(roomUsers => {
       setRoomUsers(roomUsers);
     });
  }, []);

  return (
      <>
        <ul className="playingSurface row">
          {
            roomUsers.map((roomUser, index) => {
                return (
                  <li
                    style={{
                      height: `50vw`
                    }}
                    className="col-xs-4"
                  >
                    <Card
                      key={index + 1}
                      transform={0}
                      width={`${cardDimensions.width}vw`}
                      height={`${cardDimensions.height}vw`}
                      className={`card surfaceCard`}
                      cardNumber={roomUser.message}
                      cardName={roomUser.userName}
                    />
                  </li>
                );
            })
          }
        </ul>
      </>
  );
};

export default PlayingSurface;
