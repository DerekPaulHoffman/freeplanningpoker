// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
// Styles
import './AddressForm.scss';

class AddressForm extends Component {
	constructor(props) {
		super(props);
		const { user } = props.session;

		this.state = {
			firstName: user.firstName,
			lastName: user.lastName,
			address1: user.address1,
			address2: user.address2,
			zip: user.zip,
			state: user.state,
			city: user.city,
			email: user.email,
			_errors: {
				firstName: false,
				lastName: false,
				address1: false,
				address2: false,
				zip: false,
				state: false,
				city: false,
				email: false,
			},
			_touched: {
				firstName: false,
				lastName: false,
				address1: false,
				address2: false,
				zip: false,
				state: false,
				city: false,
				email: false,
			},
		};
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormBlur = this.handleFormBlur.bind(this);
		this.validateFormFields = this.validateFormFields.bind(this);
	}

	componentDidUpdate() {
		const { formSubmitted, session } = this.props;
		const { ...userInfo } = this.state;

		if(formSubmitted) {
			return this.props.action(userInfo);
		}
	}

	handleFormChange(event) {
		const { id, value } = event.target;

		this.setState({
			[id]: value,
		}, () => {
			this.validateFormFields(id, value);
		});

		if(id === 'state') { // This is necessary because select tag is not "touched" during autocomplete.
			this.handleFormBlur(event);
		}
	}

	handleFormBlur(event) {
		const { id, value } = event.target;

		if(id !== 'address2') {
			this.setState({
				_touched: {
					...this.state._touched,
					[id]: true,
				},
			}, () => {
				this.validateFormFields(id, value);
			});
		} 
	}

	validateFormFields(elementName, elementValue) {
		const alphanumeric = new RegExp("^[\\w\\s\\#\\'\\.\\,\\-\\/]+$", 'i'); // Any alphanumeric character, hash, singlequote, period, comma, dash, forward slash, or space.
		const alphabet = new RegExp('^[\\a-z\\A-Z\\s]+$', 'i'); // Strictly letters.
		const numeric = new RegExp('^[\\d]+$', 'i'); // Strictly numbers.
		const emailRange = new RegExp('^\\S+@\\S+\\.\\S+$', 'i'); // Requires characters before @ and the first period and additional characters after final period.

		const errObj = {
			_errors: {
				...this.state._errors,
				[elementName]: true,
			},
		};
		const noErrObj = {
			_errors: {
				...this.state._errors,
				[elementName]: false,
			},
		};

		switch (elementName) {
			case 'firstName':
			case 'lastName':
			case 'city':
			case 'state':
				if((elementValue.length < 1 || !alphabet.test(elementValue)) && this.state._touched[elementName]) {
					this.setState(errObj);
				} else {
					this.setState(noErrObj);
				}
				break;
			case 'address1':
				if((elementValue.length < 1 || !alphanumeric.test(elementValue)) && this.state._touched[elementName]) {
					this.setState(errObj);
				} else {
					this.setState(noErrObj);
				}
				break;
			case 'zip':
				if((elementValue.length < 5 || !numeric.test(elementValue)) && this.state._touched[elementName]) {
					this.setState(errObj);
				} else {
					this.setState(noErrObj);
				}
				break;
			case 'email':
				if((elementValue.length < 1 || !emailRange.test(elementValue)) && this.state._touched[elementName]) {
					this.setState(errObj);
				} else {
					this.setState(noErrObj);
				}
				break;
			default:
			// Do nothing.
		}
	}
	render() {
		return (
			<div className="address-form">
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<input
							type="text"
							tabIndex="0"
							className={(this.state._errors.firstName) ? 'error' : ''}
							id="firstName"
							name="given-name"
							autoComplete="given-name"
							placeholder="First Name"
							value={this.state.firstName}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
						/>
					</div>
					<div className="col-xs-12 col-sm-6">
						<input
							type="text"
							tabIndex="0"
							className={(this.state._errors.lastName) ? 'error' : ''}
							id="lastName"
							name="family-name"
							autoComplete="family-name"
							placeholder="Last Name"
							value={this.state.lastName}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
							data-lpignore
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<input
							type="text"
							tabIndex="0"
							className={(this.state._errors.address1) ? 'error' : ''}
							id="address1"
							name="address-line1"
							autoComplete="address-line1"
							placeholder="Street Address"
							value={this.state.address1}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
							data-lpignore
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<input
							type="text"
							tabIndex="0"
							id="address2"
							name="address-line2"
							autoComplete="address-line2"
							placeholder="Apt, Suite, Bldg. (optional)"
							value={this.state.address2}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
							data-lpignore
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<input
							type="text"
							tabIndex="0"
							className={(this.state._errors.city) ? 'error' : ''}
							id="city"
							name="address-level2"
							autoComplete="address-level2"
							placeholder="City"
							value={this.state.city}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
							data-lpignore
						/>
					</div>
					<div className="col-xs-6 col-sm-3">
						<div className="select-wrapper">
							<select
								tabIndex="0"
								className={(this.state._errors.state) ? 'error' : ''}
								id="state"
								name="state address-level1"
								autoComplete="address-level1"
								value={this.state.state}
								onChange={this.handleFormChange}
								onBlur={this.handleFormBlur}
							>
								<option value="">State</option>
								<option value="AL">AL</option>
								<option value="AK">AK</option>
								<option value="AZ">AZ</option>
								<option value="AR">AR</option>
								<option value="CA">CA</option>
								<option value="CO">CO</option>
								<option value="CT">CT</option>
								<option value="DE">DE</option>
								<option value="DC">DC</option>
								<option value="FL">FL</option>
								<option value="GA">GA</option>
								<option value="HI">HI</option>
								<option value="ID">ID</option>
								<option value="IL">IL</option>
								<option value="IN">IN</option>
								<option value="IA">IA</option>
								<option value="KS">KS</option>
								<option value="KY">KY</option>
								<option value="LA">LA</option>
								<option value="ME">ME</option>
								<option value="MD">MD</option>
								<option value="MA">MA</option>
								<option value="MI">MI</option>
								<option value="MN">MN</option>
								<option value="MS">MS</option>
								<option value="MO">MO</option>
								<option value="MT">MT</option>
								<option value="NE">NE</option>
								<option value="NV">NV</option>
								<option value="NH">NH</option>
								<option value="NJ">NJ</option>
								<option value="NM">NM</option>
								<option value="NY">NY</option>
								<option value="NC">NC</option>
								<option value="ND">ND</option>
								<option value="OH">OH</option>
								<option value="OK">OK</option>
								<option value="OR">OR</option>
								<option value="PA">PA</option>
								<option value="RI">RI</option>
								<option value="SC">SC</option>
								<option value="SD">SD</option>
								<option value="TN">TN</option>
								<option value="TX">TX</option>
								<option value="UT">UT</option>
								<option value="VT">VT</option>
								<option value="VA">VA</option>
								<option value="WA">WA</option>
								<option value="WV">WV</option>
								<option value="WI">WI</option>
								<option value="WY">WY</option>
							</select>
							<div className="arrow-wrapper">
								<div className="inner-arrow-wrapper">
									<i className="up-arrow" />
									<i className="down-arrow" />
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-6 col-sm-3">
						<input
							type="tel"
							tabIndex="0"
							className={(this.state._errors.zip) ? 'error' : ''}
							id="zip"
							name="postal-code"
							autoComplete="zip postal-code"
							placeholder="Zip Code"
							maxLength="5"
							value={this.state.zip}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
							data-lpignore
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<input
							type="email"
							tabIndex="0"
							className={(this.state._errors.email) ? 'error' : ''}
							id="email"
							name="email"
							autoComplete="email"
							placeholder="Email Address"
							value={this.state.email}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
							data-lpignore
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(AddressForm);
