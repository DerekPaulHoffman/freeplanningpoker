import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as Sockets from 'Utilities/api.js';

import './Index.scss';

class Index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			val: true,
		};
	}

    
	render() {
		return (
			<div>
				<h1>Index</h1>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Index);
