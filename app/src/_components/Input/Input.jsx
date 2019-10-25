import React from 'react';

import './Input.scss';

const Input = ({
  inputType,
  placeholder,
  name,
  value,
  handleFormChange,
  maxLength,
  className
}) => {
  return (
    <>
      <label htmlFor={name} />
      <input
        type={inputType}
        className={className}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleFormChange}
        value={value}
        maxLength={maxLength}
        required
      />
    </>
  );
};

export default Input;
