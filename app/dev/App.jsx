import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import withGracefulUnmount from 'react-graceful-unmount';
import configureStore from 'Store/configureStore';

import Header from 'Components/Header/Header.jsx';

import Index from 'Templates/Index/Index.jsx';
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
		this.state = {
			loaded: false,
		}
	}

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(sessionActions.clearRoomState());
	}

	componentDidMount() {
		console.log(packageJson.version);
		const { history, session } = this.props;
		if (!this.state.loaded) {
			history.push(`/`);
		}

		Sockets.socketInit((err, timestamp) => this.setState({
			timestamp
		}));
	}
	

	componentDidUpdate(props) {
		const { session, history } = this.props;
		if (props.session.room !== session.room) {
			if (session.room !== '') {
				history.push(`/room/${session.room}`);
			}
		}
	}

	logout = () => {
		const { dispatch } = this.props;
		dispatch(sessionActions.logout());
	}

	render() {
		const { session } = this.props;
		return (
			<div className="site-wrapper">
				<Header userName={session.userName} logout={this.logout} />
				<Switch>
					<Route exact path="/room/:id" component={Room} />
					<Route exact path="/" component={Index} />
				</Switch>
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
