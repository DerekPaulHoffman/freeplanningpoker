import { useState } from 'react';

const useFormLogic = () => {
    const localUserName = localStorage.getItem('username');

    const getRoomFromUrl = window.location.pathname.replace('/', '');

    const [inputs, setInputs] = useState({
        userName: localUserName ? localUserName : '',
        roomId: getRoomFromUrl,
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