import React, { useState } from 'react';
import Draggable from 'react-draggable';
import useWindowDimensions from "../../../hooks/getWindowDimensions";

import './Card.scss';

const Card = (props) => {
  const [originalPosition, setOriginalPosition] = useState(null);
  const [dragging, setDragging] = useState(false);
  const { height } = useWindowDimensions();

  const handleDrag = (e, ui) => {
    setDragging(true);
    props.draggedState(true);
  };

  const onStart = () => {
  };

  const onStop = (e) => {
    console.log(e.changedTouches[0].clientY);
    setDragging(false);
    if (e.changedTouches[0].clientY < (height * .6)){
      console.log("above")
      //setOriginalPosition(null);
      setOriginalPosition({ x: props.xPos, y: props.yPos });
    } else {
      console.log("reset");
      setOriginalPosition({ x: props.xPos, y: props.yPos });
    }
    props.resetStates(props.myIndex);
    props.draggedState(false);
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
          <div
            style={{
              transform: `rotate(${dragging ? 0 : props.roation}deg)`,
              width: `${props.cardDimensions.width}px`,
              height: `${props.cardDimensions.height}px`
            }}
            className={`card ${props.chosenState ? "chosen" : "notChosen"}`}
          >
            {props.cardNumber}
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default Card;