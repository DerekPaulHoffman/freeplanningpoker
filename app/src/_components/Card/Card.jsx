import React, { useState, useEffect } from 'react';

import './Card.scss';

const Card = (props) => {
  return (
    <>
      <div
        style={{
          transform: `${props.transform}`,
          width: `${props.width}`,
          height: `${props.height}`
        }}
        className={props.className}
      >
        <div>{props.cardNumber}</div>
        <div className="cardName">{props.cardName}</div>
      </div>
    </>
  );
}

export default Card;