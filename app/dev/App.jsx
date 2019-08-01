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
import Cards from 'Components/Cards/Cards.jsx';
import Card from 'Components/Card/Card.jsx';

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
			roomUsers:[],
			showVotes:false,
		};

	}
	
	componentWillUpdate() {
		const { session, dispatch } = this.props;
		const sessionId = Sockets.getSessionId();
		if (session.sessionId !== sessionId) {
			dispatch(sessionActions.updateSessionId(sessionId));
			this.readRoomUsers([sessionId])
		}

	}

	componentDidMount() {
		const datUser = this.state.userName;
		if(!this.state.val) {
			console.log(packageJson.version);
		}

		Sockets.socketInit((err, timestamp) => this.setState({ 
			timestamp 
		}));
		Sockets.readRoomUsers((roomUsers) =>{
			this.readRoomUsers(roomUsers)
		});
		
		

		Sockets.readMessage((message, theUser) =>{ 
			var foundIndex = this.state.roomUsers.findIndex(x => x.id == theUser);
			this.state.roomUsers[foundIndex].vote = message
			this.forceUpdate();
		});
	}

	readRoomUsers = (roomUsers) => {
		const updateArr = [];
			
		roomUsers.map((user) => {
			updateArr.push({
				id: user,
				vote: ''
			});
		})

		this.setState({ 
			roomUsers: updateArr,
		});
	}

	
	emitOnClick = (numberVal) => {
		console.log(numberVal)
		console.log(this.state.roomUsers)
		console.log(this.props.session.sessionId)
		// const dosPeepsMassage = document.getElementById('m').value;
		const demRooms = document.getElementById('room').value;
		Sockets.sendMessage(numberVal, demRooms);
		
		var foundIndex = this.state.roomUsers.findIndex(x => x.id == this.props.session.sessionId);
		this.state.roomUsers[foundIndex].vote = numberVal
		this.forceUpdate();

		// const fullMessage = `${datUser}: ${dosPeepsMassage}`;
		// this.setState({ 
		// 	messageArray: [...this.state.messageArray, fullMessage] 
		// });
	}

	joinTheRoom = () => {
		const demRooms = document.getElementById('room').value;
		Sockets.joinRoom(demRooms);
	}

	showVotes = () => {
		this.setState({ 
			showVotes: !this.state.showVotes,
		});
	}

	setUserName = () => {
		const { dispatch } = this.props;
		const name = document.getElementById('username').value;
		
		dispatch(sessionActions.updateUserName(name));
	}

	render() {
		const { session } = this.props;
		return (
			<div className="site-wrapper">
				<div className="col-xs-6">
					<h1>Hello {session.userName}</h1>
				</div>

				<div className="col-xs-6">
					<input id="room"  placeholder="room"/>
					<button
						onClick={this.joinTheRoom}
					>
						Join the room
					</button>
				</div>
				{(session.userName === '') && (
					<div className="col-xs-6">
						<input id="username" placeholder="username" />
						<button
							onClick={this.setUserName}
						>
							Set Username
						</button>
					</div>
				)}
				<Cards emitOnClick={this.emitOnClick} />
				
				<button
							onClick={this.showVotes}
						>
							show votes
						</button>
				<ul className="card-list col-xs-12">
				{
						this.state.roomUsers.map(roomUser => {
							return (
								<div>
								<p>User: {roomUser.id}</p>
								 <li>
								 	<Card  className={(roomUser.vote && this.state.showVotes) != '' && 'card--flipped'} number={roomUser.vote}/>
								 </li>
								</div>
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
