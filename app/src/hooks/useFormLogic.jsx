import { useState } from 'react';

const useFormLogic = () => {
    const [inputs, setInputs] = useState({
        userName: '',
        roomId: '',
    });

    const handleFormChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    return {
        inputs,
        handleFormChange
    };
}

export default useFormLogic;