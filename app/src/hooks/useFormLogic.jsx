import { useState } from 'react';

const useFormLogic = () => {
    const [inputs, setInputs] = useState({
        userName: '',
        roomId: '',
    });

    const handleFormChange = (event) => {
        const re = /^[0-9A-Za-z\b]+$/;

        // if value is not blank, then test the regex

        event.persist();
        
        if (event.target.value === "" || re.test(event.target.value)) {
          setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
          }));
        }
    }

    return {
        inputs,
        handleFormChange
    };
}

export default useFormLogic;