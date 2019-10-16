import React from 'react';

import * as sessionActions from 'Actions/session.js';

import './Header.scss';

const Header = (props) => {
    return (
        <header className="header">
            <div className="row">
                <div className="col-xs-4 center-xs">
                    <h1>Free Planning Poker</h1>
                </div>
                <div className="col-xs-4 center-xs">
                    <h1>Hello {props.userName}</h1>
                </div>
                <div className="col-xs-4 center-xs">
                    <button
                        onClick={() => props.logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>

        </header>
    )
}

export default Header;