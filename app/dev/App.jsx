import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import withGracefulUnmount from 'react-graceful-unmount';
import configureStore from 'Store/configureStore';

// Actions
import * as sessionActions from 'Actions/session';

import { socketInit } from 'Utilities/api.js';

// Templates
import Index from 'Templates/Index/Index.jsx';

import './styles/Common.scss';

import packageJson from '../../package.json';

//Sockets
import * as Sockets from 'Utilities/api.js';

const store = configureStore();

function Root() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</Provider>
	);
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			val: false,
			timestamp: 'no timestamp yet',
			userName: props.session.userName,
			messageArray:[],
			roomUsers:[]
		};

	
	}
	componentDidMount() {
		const datUser = this.state.userName;
		
		
		if(!this.state.val) {
			console.log(packageJson.version);
		}


		Sockets.socketInit((err, timestamp) => this.setState({ 
			timestamp 
		}));
		Sockets.readRoomUsers((roomUsers) => this.setState({ 
			roomUsers
		}));
		

		Sockets.readMessage((message) =>{ 
			const fullMessage = `${datUser}: ${message}`;
			this.setState({ 
				messageArray: [...this.state.messageArray, fullMessage] 
			});
		});
	}

	
	emitOnClick = () => {
		const dosPeepsMassage = document.getElementById('m').value;
		const demRooms = document.getElementById('room').value;
		const datUser = this.state.userName;
		Sockets.sendMessage(dosPeepsMassage, demRooms, datUser);

		const fullMessage = `${datUser}: ${dosPeepsMassage}`;
		this.setState({ 
			messageArray: [...this.state.messageArray, fullMessage] 
		});
	}

	joinTheRoom = () => {
		const demRooms = document.getElementById('room').value;
		Sockets.joinRoom(demRooms);
	}

	setUserName = () => {
		const { dispatch } = this.props;
		const name = document.getElementById('username').value;
		
		dispatch(sessionActions.updateUserName(name));
	}

	render() {
		return (
			<div className="site-wrapper">
				<ul id="messages"></ul>

				<div className="col-xs-6">
					<input id="room"  placeholder="room"/>
					<button
						onClick={this.joinTheRoom}
					>
						Join the room
					</button>
				</div>
				{(this.state.userName === '') && (
					<div className="col-xs-6">
						<input id="username" placeholder="username" />
						<button
							onClick={this.setUserName}
						>
							Set Username
						</button>
					</div>
				)}
				<div className="col-xs-6">
					<input id="m" placeholder="message" />
					<button
						onClick={this.emitOnClick}
					>
							Send
					</button>
				</div>
				<p>
				This is the users in this room:{
						this.state.roomUsers.map(roomUsers => {
							return (<li>{roomUsers}</li>)
						})
					}
				</p>
				<ul>
					{
						this.state.messageArray.map((message, index) => {
							return (
								<li key={index + 1}>{message}</li>
							)
						})
					}
				</ul>
				{/* <Index /> */}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

const AppRouter = withGracefulUnmount(withRouter(connect(mapStateToProps)(App)));

const mountNode = document.getElementById('root');

ReactDOM.render(<Root />, mountNode);
