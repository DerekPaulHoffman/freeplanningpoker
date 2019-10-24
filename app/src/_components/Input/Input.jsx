import React from 'react';

import './Input.scss';

const Input = ({ inputType, placeholder, name, value, handleFormChange, maxLength }) => {
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
                maxLength={maxLength}
                required 
            />
        </>
    )
};

export default Input;
