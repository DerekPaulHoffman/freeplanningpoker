import React, { FunctionComponent } from 'react';

import useFormLogic from '../../hooks/useFormLogic';

type InputProps = {
    inputType: string,
    placeholder: string,
    name: string,
}

const Input: FunctionComponent<InputProps> = ({ inputType, placeholder, name}) => {
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
