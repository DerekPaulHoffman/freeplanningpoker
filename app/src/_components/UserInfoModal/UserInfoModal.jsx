import React, { useState, useEffect } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
// APIs
import * as Sockets from '../../utilities/api.js';

import './UserInfoModal.scss';

import useFormLogic from '../../hooks/useFormLogic';
import useModalRequirements from '../../hooks/useModalRequirements';

const UserInfoModal = ({
  joinExistingRoom,
  createNewRoom,
  roomId,
  changeUsername
}) => {
  const {
    showUserNameInput,
    setUserNameInput,
    showRoomInput,
    setRoomInput
  } = useModalRequirements();
  const { inputs, handleFormChange } = useFormLogic();
  const [validRoom, setValidRoom] = useState(null);
  const toggleUserName = () => {
    // Sanitize the inputs
    if (inputs.userName.length > 0) {
      setUserNameInput(false);
      setRoomInput(true);
      localStorage.setItem("username", inputs.userName);
      changeUsername(inputs.userName);
    }
  };

  const enterRoom = () => {
    // Sanitize the inputs
    if (inputs.roomId.length === 4) {
      window.history.pushState(
        inputs.roomId,
        "Free Planning Poker",
        `/${inputs.roomId}`
      );
      joinExistingRoom(inputs.roomId, localStorage.getItem("username"));
    }
  };

  const resetUsername = () => {
    setUserNameInput(true);
    changeUsername("");
  };

  useEffect(() => {
    console.log(localStorage.getItem("username"));

    if (localStorage.getItem("username")) {
      setUserNameInput(false);
      setRoomInput(true);
    } else {
      setUserNameInput(true);
    }

    if (inputs.roomId.length === 4 && !showUserNameInput) {
      setValidRoom("checking");
      enterRoom();
    }
    console.log("roomStatus", roomId);
    if (roomId) {
      setValidRoom("joined");
      setValidRoom(null);
    }
  }, [inputs.roomId, roomId]);

  // If there are stored values for User Name and Room Number, things will change
  return (
    <div id="user-info-modal">
      <div className="inner-container">
        {showUserNameInput && (
          <>
            <Input
              inputType="text"
              placeholder="Enter Your Name"
              name="userName"
              value={inputs.userName}
              handleFormChange={handleFormChange}
              maxLength="15"
            />
            <Button className="info-modal" onClick={toggleUserName}>
              Confirm Name
            </Button>
          </>
        )}
        {showRoomInput && !showUserNameInput && (
          <>
            <h1>Join Room</h1>
            <Input
              inputType="text"
              placeholder="&mdash; &mdash; &mdash; &mdash;"
              name="roomId"
              value={inputs.roomId}
              handleFormChange={handleFormChange}
              maxLength="4"
              className={`${validRoom} userName`}
            />
            <hr />
            <Button
              className="info-modal"
              onClick={createNewRoom}
              disabled={validRoom}
            >
              Create New Room
            </Button>
            <Button
              className="username-modal"
              onClick={resetUsername}
              disabled={validRoom}
            >
              Change Username
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfoModal;