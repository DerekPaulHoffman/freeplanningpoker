import React from 'react';

import './Button.scss';

const Button = (props) => {
    const { children, id, onClick } = props;
    return (
        <button
            id={id}
            onClick={onClick}
            className="btn"
        >
            { children }
        </button>
    )    
}

export default Button;
