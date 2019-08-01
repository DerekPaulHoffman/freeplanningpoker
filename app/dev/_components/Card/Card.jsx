import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as Sockets from 'Utilities/api.js';

import './Card.scss';

function flipCard(val) {
	// console.log(val);
}

class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
			val: true,
		};
	}

    
	render() {
		return (
			<li>
				{this.props.number}
		  	</li>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Card);
