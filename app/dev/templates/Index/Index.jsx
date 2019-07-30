import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressForm from 'Components/AddressForm/AddressForm.jsx';
import CreditCard from 'Components/CreditCard/CreditCard.jsx';

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
					<div className="col-xs-12 col-sm-6">
						<AddressForm />
					</div>
					<div className="col-xs-12 col-sm-6">
						<CreditCard />
					</div>


				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(Index);
