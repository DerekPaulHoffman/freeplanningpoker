import React, { Fragment } from 'react';

import Portal from "Components/Portal/Portal.jsx";

import './Modal.scss';

const Modal = (props) => {

    return (
        <Portal root="root">
            <div className="modal-container">
                {(props.type === 'user' ? (
                    <Fragment>
                        <h1>Create a Username</h1>
                        <input id="username" placeholder="username" />
                        <button
                            onClick={props.action}
                            className="btn"
                        >
                            Set Username
                        </button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <h1>Join Room</h1>
                        <input id="room" placeholder="Room Id" />
                        <button
                            onClick={props.action}
                            className="btn"
                        >
                            Join Room
                        </button>
                    </Fragment>
                ))}
            </div>
        </Portal>
    );
}

export default Modal;