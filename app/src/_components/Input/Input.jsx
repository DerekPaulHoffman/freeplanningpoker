import React from 'react';

import './Input.scss';

const Input = ({ inputType, placeholder, name, value, handleFormChange }) => {
    return (
        <>
            <label htmlFor={name} />
            <input 
                type={inputType} 
                name={name}
                id={name} 
                placeholder={placeholder} 
                onChange={handleFormChange} 
                value={value}
                required 
            />
        </>
    )
};

export default Input;
