import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import withGracefulUnmount from 'react-graceful-unmount';
import configureStore from 'Store/configureStore';

import Header from 'Components/Header/Header.jsx';
import Modal from 'Components/Modal/Modal.jsx';

import Room from 'Templates/Room/Room.jsx';

import './styles/Common.scss';


import * as Sockets from 'Utilities/api.js';
import * as sessionActions from 'Actions/session.js';

import packageJson from '../../package.json';

const store = configureStore();

function Root() {
	return (
		<Provider store={store}>
			<HashRouter>
				<AppRouter />
			</HashRouter>
		</Provider>
	);
}

class App extends Component {
	constructor(props) {
		super(props);
		const { session } = this.props;

		this.state = {
			loaded: false,
			showUserModal: false,
			showRoomModal: (session.room === '' && session.userName !== ''),
		}
	}
	
	componentDidMount() {
		console.log(packageJson.version);
		const { history, session } = this.props;

		console.log('appjsx','here');
		Sockets.socketInit((err, timestamp) => this.setState({
			timestamp
		}));

		if(session.userName === '') {
			this.renderUserModal();
		}
	}

	logout = () => {
		const { dispatch } = this.props;
		dispatch(sessionActions.logout());
	}

	renderUserModal = () => {
		this.setState({
			showUserModal: true,
		})
	}


	setUserName = async () => {
		const { dispatch, session } = this.props;
		const name = document.getElementById('username').value;
		await dispatch(sessionActions.updateUserName(name));
		if(session.room === '') {
			this.setState({
				showRoomModal: true,
			});
		}
	}

	setRoomValue = async () => {
		const { history, dispatch } = this.props;
		const room = document.getElementById('room').value;
		await dispatch(sessionActions.enterRoom(room));
		history.push(`/room/${room}`);
		this.setState({
			showRoomModal: false,
		})
	}


	render() {
		const { showUserModal, showRoomModal } = this.state;
		const { session } = this.props;
		return (
			<div className="site-wrapper">
				<Header userName={session.userName} logout={this.logout} />
				<Switch>
					<Route exact path="/room/:id" component={Room} />
				</Switch>
				{(showUserModal && session.userName === '') && (
					<Modal 
						type="user"
						action={this.setUserName}
						close={this.closeModal}
					/>
				)}
				{(showRoomModal) && (
					<Modal 
						type="room"
						action={this.setRoomValue}
						close={this.closeModal}
					/>
				)}
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
