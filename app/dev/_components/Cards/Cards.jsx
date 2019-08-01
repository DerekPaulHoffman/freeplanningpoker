import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as Sockets from 'Utilities/api.js';
import Card from 'Components/Card/Card.jsx'

import './Cards.scss';

function flipCard(val) {
	// console.log(val);
}

class Cards extends Component {
	constructor(props) {
		super(props);

		this.state = {
			val: true,
		};
	}

    
	render() {
		return (
			<ul className="card-list">
				<Card number="1" emitOnClick={this.props.emitOnClick}></Card>
				<Card number="2" emitOnClick={this.props.emitOnClick}></Card>
				<Card number="3" emitOnClick={this.props.emitOnClick}></Card>
				<Card number="5" emitOnClick={this.props.emitOnClick}></Card>
				<Card number="8" emitOnClick={this.props.emitOnClick}></Card>
				<Card number="13" emitOnClick={this.props.emitOnClick}></Card>
				<Card number="20" emitOnClick={this.props.emitOnClick}></Card>
		  	</ul>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Cards);
