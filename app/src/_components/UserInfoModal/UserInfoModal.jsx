import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

import useFormLogic from '../../hooks/useFormLogic';

import './UserInfoModal.scss';

const UserInfoModal = (props) => {
    const [joinCustomRoom, setJoinCustomRoom] = useState(false);
    const { inputs, handleFormChange } = useFormLogic();
    const toggleCustomRoom = () => {
        console.log(inputs.roomId);
        if(inputs.userName !== '' && inputs.roomId !== '') {
            // JOIN A ROOM
            console.log('join room', inputs.roomId);
        }

        if(inputs.userName !== '' && !joinCustomRoom) {
            setJoinCustomRoom(!joinCustomRoom);
        }
    }
    // If there are stored values for User Name and Room Number, things will change
    const { createNewRoom } = props;
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
            <Button
                id="new-room"
                onClick={createNewRoom}
            >
                Create Room
            </Button>            
        </div>
    )
}

export default UserInfoModal;