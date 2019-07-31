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

import './styles/Common.scss';

import packageJson from '../../package.json';

//Sockets
import * as Sockets from 'Utilities/api.js';


function Root() {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
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

		Sockets.subscribeToTimer((err, timestamp) => this.setState({ 
			timestamp 
		  }));

		  
		  Sockets.readMessage((message) =>{ 
			  console.log('poop123' + message);
			  this.setState({ 
				messageArray: [...this.state.messageArray, message] 
			  });
		  });
	}
	componentDidMount() {
		if(!this.state.val) {
			console.log(packageJson.version);
		}
	}

	
	emitOnClick = () => {
		const dosPeepsMassage = document.getElementById('m').value;
		Sockets.sendMessage(dosPeepsMassage);
	}

	render() {
		return (
			<div className="site-wrapper">
				<div>
				{(this.state.val) &&
                    <h1>Index</h1>
				}
				<div className="row">
				<ul id="messages"></ul>
						<input id="m" autocomplete="off" />
						<button
						onClick={this.emitOnClick}
						>Send</button>
				</div>
			</div>
				 <p className="App-intro">
				This is the timer value: {this.state.timestamp}
				</p>
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

const mountNode = document.getElementById('root');

ReactDOM.render(<App />, mountNode);
