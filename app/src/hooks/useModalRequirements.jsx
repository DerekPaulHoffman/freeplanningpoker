import { useState, useEffect } from 'react';

const useModalRequirements = () => {
    const [showUserNameInput, setUserNameInput] = useState(true);
    const [showRoomInput, setRoomInput] = useState(false);
    const [showModal, setShowModal] = useState(true);

    return {
        showModal,
        setShowModal,
        showUserNameInput,
        setUserNameInput,
        showRoomInput,
        setRoomInput,
    }
}

export default useModalRequirements;