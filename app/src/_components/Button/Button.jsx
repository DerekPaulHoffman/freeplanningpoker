import React from 'react';

import './Button.scss';

const Button = (props) => {
    const { children, id, onClick, className } = props;
    return (
        <button
            id={id}
            onClick={onClick}
            className={`btn ${className}`}
        >
            { children }
        </button>
    )    
}

export default Button;
