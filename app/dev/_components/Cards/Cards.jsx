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
				<Card number="1"></Card>
				<Card number="2"></Card>
				<Card number="3"></Card>
				<Card number="5"></Card>
				<Card number="8"></Card>
				<Card number="13"></Card>
				<Card number="20"></Card>
		  	</ul>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Cards);
