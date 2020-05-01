import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import useWindowDimensions from "../../../hooks/getWindowDimensions";


//Sockets
import * as Sockets from '../../../utilities/api.js';

import Card from "../../Card/Card";

import "./DraggableCard.scss";

const DraggableCard = ({
  xPos,
  yPos,
  myIndex,
  cardNumber,
  draggedState,
  resetStates,
  roation,
  cardDimensions,
  chosenState,
  websocket,
  sendUpNewCards,
}) => {
  const [originalPosition, setOriginalPosition] = useState({
    x: 0,
    y: 1000,
  });
  const [dragging, setDragging] = useState(false);
  const { height } = useWindowDimensions();

  useEffect(() => {
    setOriginalPosition({ x: xPos, y: yPos });
  }, [xPos, yPos]);

  const handleDrag = (e, ui) => {
    setDragging(true);
    draggedState(true);
  };

  const onStart = () => {};

  const onStop = async (e) => {
    setDragging(false);
    draggedState(false);
    setOriginalPosition({ x: xPos, y: yPos });
    console.log(e);
    if (e.type === "touchend") {
      if (e.changedTouches[0].clientY < height * 0.7) {
        resetStates(myIndex);
        const sentCards = await Sockets.sendCardNumber(websocket, cardNumber);
        console.log(sentCards);
        sendUpNewCards(sentCards);
      }
    }
  };

  return (
    <>
      <Draggable
        handle=".handle"
        defaultPosition={{ x: xPos, y: yPos }}
        position={originalPosition}
        scale={1}
        onStart={onStart}
        onDrag={handleDrag}
        onStop={onStop}
      >
        <div className="handle">
          <Card
            transform={`rotate(${dragging ? 0 : roation}deg)`}
            width={`${cardDimensions.width}vw`}
            height={`${cardDimensions.height}vw`}
            className={`card ${chosenState ? "chosen" : "notChosen"}`}
            cardNumber={cardNumber}
          />
        </div>
      </Draggable>
    </>
  );
};

export default DraggableCard;