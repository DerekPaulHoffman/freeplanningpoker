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
			messageArray:[],
		};

	
	}
	componentDidMount() {
		if(!this.state.val) {
			console.log(packageJson.version);
		}

		Sockets.socketInit((err, timestamp) => this.setState({ 
			timestamp 
		}));

		Sockets.readMessage((message, datUser) =>{ 
			console.log('poop123' + message);
			this.setState({ 
			messageArray: [...this.state.messageArray, 'User:' +datUser + " Message:" + message] 
			});
		});
	}

	
	emitOnClick = () => {
		const dosPeepsMassage = document.getElementById('m').value;
		const demRooms = document.getElementById('room').value;
		const datUser = document.getElementById('username').value;
		Sockets.sendMessage(dosPeepsMassage, demRooms, datUser);
		this.setState({ 
			messageArray: [...this.state.messageArray, dosPeepsMassage] 
		});
	}

	joinTheRoom = () => {
		const demRooms = document.getElementById('room').value;
		Sockets.joinRoom(demRooms);
	}

	render() {
		return (
			<div className="site-wrapper">
				<ul id="messages"></ul>
				<input id="m" placeholder="message"/>
				<input id="room"  placeholder="room"/>
				<input id="username"  placeholder="username"/>
				<button
					onClick={this.emitOnClick}
				>
					Send
				</button>
				<button
					onClick={this.joinTheRoom}
				>
					Join the room
				</button>
				<p className="App-intro">
					This is the timer value: {this.state.timestamp}
				</p>
				<Index />
				<ul>
					{
						this.state.messageArray.map(message => {
							return (<li>{message}</li>)
						})
					}
				</ul>
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
