import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

import useFormLogic from '../../hooks/useFormLogic';

import './UserInfoModal.scss';

const UserInfoModal = (props) => {
    const { createNewRoom, joinExistingRoom } = props;

    const [joinCustomRoom, setJoinCustomRoom] = useState(false);
    const { inputs, handleFormChange } = useFormLogic();
    const toggleCustomRoom = () => {
        if (inputs.userName !== '' && !joinCustomRoom) {
            setJoinCustomRoom(!joinCustomRoom);
        }

        if(inputs.userName !== '' && inputs.roomId !== '') {
            // JOIN A ROOM
            joinExistingRoom(inputs.roomId, inputs.userName);
        }
    }

    const sendUserNameUp = () => {
        if(inputs.userName !== '') {
            createNewRoom(inputs.userName);
        }
    }
    // If there are stored values for User Name and Room Number, things will change
    return (
        <div id="user-info-modal">
            <h2>Who are you?</h2>
            <Input 
                inputType="text"
                placeholder="Enter UserName"
                name="userName"
                value={inputs.userName}
                handleFormChange={handleFormChange}
            />
            {(joinCustomRoom) && (
                <>
                    <h2>Where are you going?</h2>
                    <Input
                        inputType="text"
                        placeholder="Room ID"
                        name="roomId"
                        value={inputs.roomId}
                        handleFormChange={handleFormChange}
                    />
                </>
            )}
            <Button
                className="info-modal"
                onClick={toggleCustomRoom}
            >
                Join Room
            </Button>
            {/* The below button is not ready */}
            {/* <Button
                id="new-room"
                onClick={sendUserNameUp}
            >
                Create Room
            </Button>             */}
        </div>
    )
}

export default UserInfoModal;