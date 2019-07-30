// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import * as cardValidators from 'Utilities/cardValidation.js';
import * as SYN from 'Utilities/syntool.js';

// Styles
import './CreditCard.scss';

class CreditCard extends Component {
	constructor(props) {
		super(props);

		const date = new Date();
		const month = date.getMonth() + 1;
		const year = (date.getFullYear()).toString();

		this.state = {
			ccNumber: '',
			ccType: '',
			ccExpMonth: (month < 10) ? `0${month}` : month.toString(),
			ccExpYear: year,
			cvv: '',
			_errors: {
				ccNumber: false,
				ccMonth: false,
				ccYear: false,
				cvv: false,
			},
			_touched: {
				ccNumber: false,
				ccMonth: false,
				ccYear: false,
				cvv: false,
			},
			cvvPopup: false,
			goodToGo: true,
		};

		this.validateFormFields = this.validateFormFields.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormBlur = this.handleFormBlur.bind(this);
		this.resetSession = this.resetSession.bind(this);
	}

	componentDidUpdate() {
		const { formSubmitted, loggedIn } = this.props;
		const { ...billingInfo } = this.state;

		if (formSubmitted && !loggedIn && billingInfo.goodToGo) {
			this.initiateOrderPlacement(billingInfo);
		}
	}

	handleFormChange(event) {
		const { target } = event;
		const elementName = target.name;
		const elementValue = target.value;

		this.setState({
			[elementName]: elementValue,
		});

		if (elementName === 'ccExpMonth' || elementName === 'ccExpYear') { // This is necessary because select tag is not "touched" during autocomplete.
			this.handleFormBlur(event);
		} else { // Only validate expiration fields when the user submits the form.
			if (elementName === 'ccNumber') { // Update UI for card type
				cardValidators.checkCardType(elementValue, (result) => {
					this.setState({
						ccType: result.cardType,
					});
				});
			}
			this.validateFormFields(elementName, elementValue);
		}
	}

	handleFormBlur(event) {
		const { target } = event;
		const elementName = target.name;

		this.setState({
			_touched: {
				...this.state._touched,
				[elementName]: true,
			},
		});
	}
    
	validateFormFields(elementName, elementValue) {
		const numeric = new RegExp('^\\d+$', 'i'); // Strictly numbers.

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
			case 'ccNumber':
				if (((elementValue.length < 13 || elementValue.length > 16) && !cardValidators.modTen(false, elementValue)) || !numeric.test(elementValue)) {
					this.setState(errObj);
				} else {
					this.setState(noErrObj);
				}
				break;
			case 'cvv':
				if ((elementValue.length < 3 && !cardValidators.isValidCVV(false, elementValue)) || !numeric.test(elementValue)) {
					this.setState(errObj);
				} else {
					this.setState(noErrObj);
				}
				break;
			default:
            // Do nothing.
		}
	}

	initiateOrderPlacement(billingInfo) {
		const { session } = this.props;
		
		if (
			!cardValidators.modTen(true, billingInfo.ccNumber) ||
			!cardValidators.isValidCVV(true, billingInfo.cvv, billingInfo.ccType) ||
			!cardValidators.isValidCC(true, billingInfo.ccNumber, billingInfo.ccType) ||
			!cardValidators.isValidCCDate(true, billingInfo.ccExpMonth, billingInfo.ccExpYear)
		) {
			this.props.validInfo(false);
		} else {
			this.setState({
				goodToGo: false,
			}, () => {
				this.props.validInfo(true);
				this.placeSwatOrder();
			});
		}
	}

	placeSwatOrder() {
		const { _errors, _touched, ...billingInfo } = this.state;
		const { offers, cart, session } = this.props;
		const cartPayload = cart.upfront; // In the case that this is a PayPal order, then instead of using the cart that is in the Redux store use the cart that is passed to this method.

		const IP = this.props.ip;

		const request = SYN.acceptOffer(session, billingInfo, cartPayload, { loggedIn: false }, IP);

		return request.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			return response;
		})
			.then((response) => {
				response.json().then((data) => {
					if (!data.hasErrors) {
						const params = {
							requests: ['promotion', 'upfrontItems'],
						};
						const orderInfoRequest = SYN.getOrderInfo(params);

						return orderInfoRequest.then((orderResponse) => {
							if (!orderResponse.ok) {
								throw Error(orderResponse.statusText);
							}

							return orderResponse;
						})
							.then((orderResponse) => {
								orderResponse.json().then((orderData) => {
									cartPayload.map((item) => {
										const gaCategory = (item.ymalFlag) ? 'YMAL' : 'Upfront';
										const productIndexInOfferList = offers[gaCategory.toLowerCase()].findIndex((element) => {
											return element.productName === item.productName;
										});
										ReactGA.ga('ec:addProduct', {
											id: item.offerPK,
											name: item.productName,
											category: gaCategory,
											price: '2.00',
											position: productIndexInOfferList + 1,
											quantity: 1,
										});
									});
									ReactGA.ga('ec:setAction', 'purchase', {
										id: orderData.orderId,
										list: 'Upfront',
									});
									ReactGA.ga('set', 'metric12', 1);
									ReactGA.ga('set', 'metric5', cartPayload.length);
									ReactGA.ga('set', 'dimension30', billingInfo.ccType);
									ReactGA.event({
										category: 'Checkout',
										action: 'Option',
									});

									this.props.clearWebpromotionData();
								});
							})
							.catch(() => {
								redirectUser(session.webpromotion, 'getOrderInfo failure from placeSwatOrder');
							});
					}

					this.props.validInfo();
					if (data.errors[0] === 108 || data.errors[0] === 113 || data.errors[0] === 132 || data.errors[0] === 133) {
						ReactGA.ga('set', 'dimension16', data.errors[0].toString());
						ReactGA.event({
							category: 'RT Auth Error',
							action: 'CVV and/or charge request was declined',
							label: data.errors[0].toString(),
						});
						alert('Please enter a valid Card Number and/or 3- or 4-digit Security Code.');
						this.setState({
							goodToGo: true,
						});
					} else if (data.errors[0] === 134) {
						this.resetSession('RT Auth Error', data.errors[0].toString());
					} else {
						alert('There has been an error processing your order. Please ensure your information has been filled out correctly.')
						this.setState({
							goodToGo: true,
						});
					}

				});
			})
			.catch(() => {
				redirectUser(session.webpromotion, 'acceptOffer failure from placeSwatOrder');
			});
	}

	resetSession(category, error) {
		const { session, dispatch } = this.props;

		ReactGA.ga('set', 'dimension16', error);
		ReactGA.event({
			category,
			action: '3 consecutive failed auth attempts',
		});
		alert('We apologize, your session has been terminated due to too many invalid attempts. You may attempt to place your order again using a different payment method.\n\nFor alternative options to place an order, call 1-800-429-2550.');

		const initRequest = SYN.initSession(session.webpromotion, session.gatingKey);

		return initRequest.then((initResponse) => {
			if (!initResponse.ok) {
				throw Error(initResponse.statusText);
			}

			return initResponse;
		})
			.then((initResponse) => {
				initResponse.json().then((initData) => {
					if (!initData.hasErrors) { // Redirect user to landing page of template if able to successfully init new session. Also, clear cart, offer, and session.user state.
						dispatch(cartActions.clearCart());
						dispatch(offerActions.clearOffers());
						dispatch(sessionActions.clearUserData());
						dispatch(sessionActions.updateSwatSessionId(initData.sessionId, initData.promotion.parentCampaignId, initData.promotion.clientId));
						dispatch(sessionActions.flipNewSessionFlag(true));
						dispatch(sessionActions.incrementAuthCount(true)); // Reset the authCount in Redux store if they return to the landing page.

						if (this.props.location.pathname !== `/${this.props.session.template}`) {
							dispatch(sessionActions.updatePageVal('landing', 'LR1'));
							this.props.history.push(`/${this.props.session.template}`);
						}
					} else { // Redirect user out of flow if unable to init a new session.
						redirectUser(`${session.webpromotion}`, 'initSession error from placeSwatOrder');
					}
				});
			})
			.catch(() => {
				redirectUser(`${session.webpromotion}`, 'initSession failure from placeSwatOrder');
			});
	}
    
	render() {
		const ccMonths = [];

		for (let m = 1; m <= 12; m += 1) {
			const num = (m < 10) ? `0${m}` : m;

			ccMonths.push(
				<option key={m} value={num}>{num}</option>,
			);
		}

		const ccYears = [];
		const year = new Date().getFullYear();

		for (let y = year; y < year + 10; y += 1) {
			ccYears.push(
				<option key={y} value={y}>{y}</option>,
			);
		}

		return (
			<div className="billing-form">
				<div className="m-creditcards">
					<div data-name="visa" className={`visaCard ${(this.state.ccType === 'visa') ? 'on' : ''}`} />
					<div data-name="master" className={`masterCard ${(this.state.ccType === 'master') ? 'on' : ''}`} />
					<div data-name="amex" className={`americanExpressCard ${(this.state.ccType === 'amex') ? 'on' : ''}`} />
					<div data-name="discover" className={`discoverCard ${(this.state.ccType === 'discover') ? 'on' : ''}`} />
					<div id="cvv-wrap">
						<button
							type="button"
							tabIndex="0"
							id="cvv-prompt"
							onClick={() => {
								this.setState({ cvvPopup: !this.state.cvvPopup });
								ReactGA.event({
									category: 'CVV',
									action: 'What is this? clicked',
								});
							}}
						>
                            What is this?
							<div id="cvv-popup" className={(this.state.cvvPopup) ? 'show' : ''}>
								<div id="arrow-reference">(CVV/CVC) 3-4 digit<br />code, typically found<br />on back of card.</div>
							</div>
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-8">
						<input
							type="tel"
							tabIndex="0"
							name="ccNumber"
							id="ccNumber"
							autoComplete="cc-number"
							placeholder="Account Number"
							maxLength="16"
							value={this.state.ccNumber}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
						/>
					</div>
					<div className="col-xs-4">
						<input
							type="tel"
							tabIndex="0"
							name="cvv"
							id="cvv"
							placeholder="CVV/CVC"
							autoComplete="cc-csc"
							maxLength="4"
							value={this.state.cvv}
							onChange={this.handleFormChange}
							onBlur={this.handleFormBlur}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-5 exp-dates">
						<p>Expiration Date</p>
						<div className="row">
							<div className="col-xs-6">
								<div className="select-wrapper">
									<select
										tabIndex="0"
										name="ccExpMonth"
										id="ccExpMonth"
										value={this.state.ccExpMonth}
										onChange={this.handleFormChange}
										onBlur={this.handleFormBlur}
									>
										{ccMonths}
									</select>
									<div className="arrow-wrapper">
										<div className="inner-arrow-wrapper">
											<i className="up-arrow" />
											<i className="down-arrow" />
										</div>
									</div>
								</div>
							</div>
							<div className="col-xs-6">
								<div className="select-wrapper">
									<select
										tabIndex="0"
										name="ccExpYear"
										id="ccExpYear"
										value={this.state.ccExpYear}
										onChange={this.handleFormChange}
										onBlur={this.handleFormBlur}
									>
										{ccYears}
									</select>
									<div className="arrow-wrapper">
										<div className="inner-arrow-wrapper">
											<i className="up-arrow" />
											<i className="down-arrow" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps)(CreditCard);
