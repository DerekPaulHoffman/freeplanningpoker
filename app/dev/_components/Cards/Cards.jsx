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
			<ul className="card-list col-xs-12">
				<Card number="1" className='card--flipped' emitOnClick={this.props.emitOnClick}></Card>
				<Card number="2" className='card--flipped'  emitOnClick={this.props.emitOnClick}></Card>
				<Card number="3" className='card--flipped'  emitOnClick={this.props.emitOnClick}></Card>
				<Card number="5" className='card--flipped'  emitOnClick={this.props.emitOnClick}></Card>
				<Card number="8" className='card--flipped'  emitOnClick={this.props.emitOnClick}></Card>
				<Card number="13" className='card--flipped'  emitOnClick={this.props.emitOnClick}></Card>
				<Card number="20" className='card--flipped'  emitOnClick={this.props.emitOnClick}></Card>
		  	</ul>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Cards);
