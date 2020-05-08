import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

//hooks
import useWindowDimensions from "../../../hooks/getWindowDimensions";

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
        sendUpNewCards(cardNumber);
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