import React, { useState, useEffect } from "react";
import useWindowDimensions from '../../hooks/getWindowDimensions'


import './CardHolder.scss';

// Components
import Card from './Card/Card';
import Portal from "../Portal/Portal";


const CardHolder = () => {
  const fibonacci = [1, 2, 3, 5, 8, 13, 20];
  const [chosenIndex, setchosenIndex] = useState(-1);
  const [currentDraggedState, setcurrentDraggedState] = useState(false);
  const { height, width } = useWindowDimensions();
  const cardDimensions = {width:2.25 * 30, height:3.5 * 30}

  const resetStates = (chosenIndex) => {
    setchosenIndex(chosenIndex);
  }
  const draggedState = currentDraggedState => {
    setcurrentDraggedState(currentDraggedState);
  };

  return (
    <div className="cardHolder" id="cardHolder">
      <p>
        height:{height} width:{width}
      </p>
      <div
        className={`${currentDraggedState ? "show" : "hide"} overlayPhantomCard`}
      >
        <div
          className="selectionCardBox"
          style={{
            width: `${cardDimensions.width}px`,
            height: `${cardDimensions.height}px`
          }}
        ></div>
      </div>
      {fibonacci.map((cardNumber, index) => {
        return (
          <Card
            cardNumber={cardNumber}
            resetStates={resetStates}
            draggedState={draggedState}
            chosenState={index === chosenIndex}
            myIndex={index}
            xPos={((width - 50) / fibonacci.length) * index + 25}
            yPos={
              height -
              200 +
              Math.abs((90 / (fibonacci.length - 1)) * index - 45) * 1
            }
            roation={(90 / (fibonacci.length - 1)) * index - 45}
            cardDimensions={cardDimensions}
          />
        );
      })}
    </div>
  );
}

export default CardHolder;
