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

	emitOnClick = () => {
		const dosPeepsMassage = document.getElementById('m').value;
		Sockets.sendMessage(dosPeepsMassage);
	}
    
	render() {
		return (
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
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Index);
