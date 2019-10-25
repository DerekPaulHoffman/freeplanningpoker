import React from 'react';

import './Button.scss';

const Button = (props) => {
    const { children, id, onClick, className, disabled } = props;
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${className}`}
        >
            { children }
        </button>
    )    
}

export default Button;
