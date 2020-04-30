import React, { useState } from "react";
import useWindowDimensions from '../../hooks/getWindowDimensions'


import './CardHolder.scss';

// Components
import DraggableCard from "./DraggableCard/DraggableCard";


const CardHolder = ({ websocket, sendUpNewCards }) => {
  const fibonacci = [1, 2, 3, 5, 8, 13, 20];
  const [chosenIndex, setchosenIndex] = useState(-1);
  const [currentDraggedState, setcurrentDraggedState] = useState(false);
  const { height, width } = useWindowDimensions();
  const cardDimensions = { width: 2.25 * 10, height: 3.5 * 10 };

  const resetStates = (chosenIndex) => {
    setchosenIndex(chosenIndex);
  };
  const draggedState = (currentDraggedState) => {
    setcurrentDraggedState(currentDraggedState);
  };

  return (
    <div className="cardHolder" id="cardHolder">
      <div
        className={`${
          currentDraggedState ? "show" : "hide"
        } overlayPhantomCard`}
      >
        <div
          className="selectionCardBox"
          style={{
            width: `${cardDimensions.width}vw`,
            height: `${cardDimensions.height}vw`,
          }}
        ></div>
      </div>
      {fibonacci.map((cardNumber, index) => {
        return (
          <div key={`draggableCard${cardNumber}`}>
            <DraggableCard
              cardNumber={cardNumber}
              resetStates={resetStates}
              draggedState={draggedState}
              websocket={websocket}
              sendUpNewCards={sendUpNewCards}
              chosenState={index === chosenIndex}
              myIndex={index}
              xPos={((width - 50) / fibonacci.length) * index + 20}
              yPos={
                height -
                120 +
                Math.abs((90 / (fibonacci.length - 1)) * index - 45) * 1
              }
              roation={(90 / (fibonacci.length - 1)) * index - 45}
              cardDimensions={cardDimensions}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardHolder;
