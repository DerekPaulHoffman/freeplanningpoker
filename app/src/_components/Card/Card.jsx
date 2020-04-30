import React from 'react';

import './Card.scss';

const Card = ({
  transform,
  width,
  height,
  className,
  showVotes,
  cardNumber,
  cardName,
}) => {
  return (
    <>
      <div
        style={{
          transform: `${transform}`,
          width: `${width}`,
          height: `${height}`,
        }}
        className={className}
      >
        <div className="cardShowVotes">{showVotes}</div>
        <div className="cardNumber">{cardNumber}</div>
        <div className="cardName">{cardName}</div>
      </div>
    </>
  );
};

export default Card;