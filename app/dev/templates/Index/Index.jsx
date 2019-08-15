import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'Components/Button/Button.jsx';

import * as Sockets from 'Utilities/api.js';
import * as sessionActions from 'Actions/session.js';

import './Index.scss';

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			val: true,
		};
	}

	setUserName = () => {
		const { dispatch } = this.props;
		const name = document.getElementById('username').value;
		dispatch(sessionActions.updateUserName(name));
		Sockets.sendUsername(name);
	}

	joinRoom = () => {
		const { dispatch } = this.props;
		const roomName = document.getElementById('room').value;
		dispatch(sessionActions.enterRoom(roomName));
	}

	render() {
		const { session } = this.props;
		return (
			<div className="card-list">
				{(session.userName === '') && (
					<div className="col-xs-6 center-xs">
						<h1>Create a Username</h1>
						<input id="username" placeholder="username" />
						<button
							onClick={this.setUserName}
						>
							Set Username
						</button>
					</div>
				)}
				
				{((session.userName !== '') && (session.room === '')) && (
					<div className="col-xs-6 center-xs">
						<h1>Please join a room</h1>
						<input id="room" placeholder="Room Name" />
						<button
							onClick={this.joinRoom}
						>
							Join Room
						</button>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Index);
