import React, { Component } from 'react';
import { connect } from 'react-redux';

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
				{(this.state.val) &&
                    <h1>Index</h1>
				}
				<div className="row">
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Index);
