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

import { subscribeToTimer } from 'Utilities/api.js';

// Templates
import Index from 'Templates/Index/Index.jsx';

import './styles/Common.scss';

import packageJson from '../../package.json';

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


		subscribeToTimer((err, timestamp) => this.setState({ 
			timestamp 
		}));
		this.state = {
			timestamp: 'no timestamp yet',
		};
	}
	componentDidMount() {
		if(!this.state.val) {
			console.log(packageJson.version);
		}
	}

	render() {
		return (
			<div className="site-wrapper">
				<div className="App">
					<p className="App-intro">
						This is the timer value: {this.state.timestamp}
					</p>
				</div>
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
