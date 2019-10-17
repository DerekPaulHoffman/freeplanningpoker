import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import useWindowDimensions from "../../../hooks/getWindowDimensions";

import './Card.scss';

const Card = (props) => {
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

  const onStart = () => {
  };

  const onStop = (e) => {
    setDragging(false);
    props.draggedState(false);
    setOriginalPosition({ x: props.xPos, y: props.yPos });
    console.log(e);
    if (e.type === 'touchend') {
      console.log(e.changedTouches);
      console.log(e.changedTouches[0].clientY);
      if (e.changedTouches[0].clientY < height * 0.7) {
        console.log("above");
        props.resetStates(props.myIndex);
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