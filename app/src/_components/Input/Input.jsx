import React, { FunctionComponent } from 'react';

import useFormLogic from '../../hooks/useFormLogic';

const Input = ({ inputType, placeholder, name}) => {
    const { inputs, handleFormChange } = useFormLogic();
    return (
        <>
            <input 
                type={inputType} 
                name={name} 
                placeholder={placeholder} 
                onChange={handleFormChange} 
                value={inputs[name]}
                required 
            />
        </>
    )
};

export default Input;
