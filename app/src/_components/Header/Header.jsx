import React, { useState, useEffect } from 'react';

import Button from '../Button/Button';

import * as Sockets from '../../utilities/api.js';

import useFormLogic from '../../hooks/useFormLogic';
import useModalRequirements from '../../hooks/useModalRequirements';

import './Header.scss';

const Header = () => {
    const { inputs } = useFormLogic();
    const { setShowModal, setUserNameInput, setRoomInput } = useModalRequirements();
    
    const changeUserName = () => {
        inputs.userName = '';
        setShowModal(true);
        setUserNameInput(false);
        setRoomInput(false);
    }

    return (
        <header id="header">
            <div className="top-header">
                <h1>FREE PLANNING POKER</h1>
            </div>
            <div className="sub-header row">
                <div className="col-xs-3">
                    <Button
                        className="pill username"
                        onClick={changeUserName}
                    >
                        {inputs.userName}
                    </Button>
                </div>
                <div className="col-xs-6">
                    <Button
                        className="icon"
                    >
                        Exit
                    </Button>
                    <Button
                        className="pill roomid"
                    >
                        {inputs.roomId}
                    </Button>
                    <Button
                        className="icon"
                    >
                        Share
                    </Button>
                </div>
                <div className="col-xs-3">

                </div>
            </div>
        </header>
    )
}

export default Header;
