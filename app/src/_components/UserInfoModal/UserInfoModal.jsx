import React, { useState, useEffect } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

import useFormLogic from '../../hooks/useFormLogic';

import './UserInfoModal.scss';

const UserInfoModal = (props) => {
    const { createNewRoom, joinExistingRoom } = props;
    const [showUserNameInput, setUserNameInput] = useState(true);
    const [showRoomInput, setRoomInput] = useState(false);
    const { inputs, handleFormChange } = useFormLogic();

    const toggleUserName = () => {
        // Sanitize the inputs
        if(inputs.userName.length > 0) {
            setUserNameInput(false);
            setRoomInput(true);
            localStorage.setItem('username', inputs.userName);
        }
    }

    const enterRoom = () => {
        // Sanitize the inputs
        if(inputs.roomId.length === 4) {
            window.history.pushState(inputs.roomId, 'Free Planning Poker', `/${inputs.roomId}`);
            joinExistingRoom(inputs.roomId, inputs.userName);
        }
    }

    useEffect(() => {
        if(inputs.userName !== '') {
            toggleUserName();
        }
    }, [])
    // If there are stored values for User Name and Room Number, things will change
    return (
        <div id="user-info-modal">
            <div className="inner-container">
                {(showUserNameInput) && (
                    <>
                        <Input
                            inputType="text"
                            placeholder="Enter Your Name"
                            name="userName"
                            value={inputs.userName}
                            handleFormChange={handleFormChange}
                            maxLength="15"
                        />
                        <Button
                            className="info-modal"
                            onClick={toggleUserName}
                        >
                            Confirm Name
                    </Button>
                    </>
                )}
                {(showRoomInput && !showUserNameInput) && (
                    <>
                        <h1>Join Room</h1>
                        <Input
                            inputType="text"
                            placeholder="- - - -"
                            name="roomId"
                            value={inputs.roomId}
                            handleFormChange={handleFormChange}
                            maxLengt="4"
                        />
                        <hr />
                        <Button
                            className="info-modal"
                            onClick={createNewRoom}
                        >
                            Create New Room
                    </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserInfoModal;