import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import useWindowDimensions from "../../../hooks/getWindowDimensions";


//Sockets
import * as Sockets from '../../../utilities/api.js';

import Card from "../../Card/Card";

import "./DraggableCard.scss";

const DraggableCard = props => {
  const [originalPosition, setOriginalPosition] = useState(null);
  const [dragging, setDragging] = useState(false);
  const { height } = useWindowDimensions();

  useEffect(() => {
    setOriginalPosition({ x: props.xPos, y: props.yPos });
  }, []);

  const handleDrag = (e, ui) => {
    setDragging(true);
    props.draggedState(true);
  };

  const onStart = () => {};

  const onStop = e => {
    setDragging(false);
    props.draggedState(false);
    setOriginalPosition({ x: props.xPos, y: props.yPos });
    console.log(e);
    if (e.type === "touchend") {
      console.log(e.changedTouches);
      console.log(e.changedTouches[0].clientY);
      if (e.changedTouches[0].clientY < height * 0.7) {
        console.log("above");
        props.resetStates(props.myIndex);
        Sockets.sendMessage(props.cardNumber);
      }
    }
  };

  return (
    <>
      <Draggable
        handle=".handle"
        defaultPosition={{ x: props.xPos, y: props.yPos }}
        position={originalPosition}
        scale={1}
        onStart={onStart}
        onDrag={handleDrag}
        onStop={onStop}
      >
        <div className="handle">
          <Card
            transform={`rotate(${dragging ? 0 : props.roation}deg)`}
            width={`${props.cardDimensions.width}vw`}
            height={`${props.cardDimensions.height}vw`}
            className={`card ${props.chosenState ? "chosen" : "notChosen"}`}
            cardNumber={props.cardNumber}
          />
        </div>
      </Draggable>
    </>
  );
};

export default DraggableCard;