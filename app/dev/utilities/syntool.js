/* DEPENDENCIES */
import 'whatwg-fetch';

/* UTILITIES */
import {
	apiURL,
	credentials,
} from 'Utilities/env.js';

/* API Calls */

export function initSession(webpromotion, gatingKey) {
	const encodedParams = encodeURIComponent(`{"webPromotionId"="${webpromotion}","promotionKey"="${gatingKey}"}`);
	const apiQueryParams = `initParams=${encodedParams}`;

	return fetch(`${apiURL}/session/init`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		credentials,
		body: apiQueryParams,
	});
}

export function getOfferList(sequence, page, webpromotion, bizrateToken) {
	const payload = {
		seq: sequence,
		page,
		offerType: 'SEQ',
		webPromotionId: webpromotion,
		bizrate_token: bizrateToken,
	};
	const encodedParams = encodeURIComponent(JSON.stringify(payload));
	const apiQueryParams = `offerListParams=${encodedParams}`;

	return fetch(`${apiURL}/catalog/offerlist?${apiQueryParams}&_=${Date.now()}`, {
		credentials,
	});
}

export function getOrderInfo(params) {
	const apiQueryParams = encodeURIComponent(JSON.stringify({ selections: params.requests }));

	return fetch(`${apiURL}/order/orderinfo?selections=${apiQueryParams}&_=${Date.now()}`, {
		credentials,
	});
}

export function getMetaData() {
	return fetch(`${apiURL}/service/metadata?serviceName=PROMO_SERVICE&_=${Date.now()}`, {
		credentials,
	});
}

export function getSessionData(metadata = false) {
	const apiQueryParams = encodeURIComponent('{"selections":["metadata"]}');
	const urlParams = (metadata) ? `?${apiQueryParams}&_=${Date.now()}` : '';

	return fetch(`${apiURL}/session/sessiondata${urlParams}`, {
		method: 'POST',
		credentials,
		...metadata && ('body': apiQueryParams), // This is a cool ES6 thing. Basically, if metadata is true include the body in the fetch call. If it is false, nothing is added.
	});
}

export function getPromoCode(SKUVAL, sessionId, tokenId) {
	const payload = {
		promoCodeReq: {
			SKU: [
				SKUVAL,
			],
			sessionId,
		},
	};

	const apiQueryParams = JSON.stringify(payload);

	return fetch('https://promotion.sgiwebservices.com/promotion/getPromoCode', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${tokenId}`,
		},
		credentials,
		body: apiQueryParams,
	});
}

export function getProductDetails(productID) {
	const encodedParams = encodeURIComponent(`{"id":${productID},"type":1}`);
	const apiQueryParams = `productDetailParams=${encodedParams}`;

	return fetch(`${apiURL}/catalog/product?${apiQueryParams}&_=${Date.now()}`, {
		credentials,
	});
}

export function updateSelections(offerPKString) {
	const encodedParams = encodeURIComponent(`{"upfrontItems":${offerPKString}}`);
	const apiQueryParams = `updateSelectionsParams=${encodedParams}`;

	return fetch(`${apiURL}/shoppingcart/updateselections?${apiQueryParams}`, { credentials });
}

export function acceptOffer(sessionInfo, billingInfo, cart) {
	const { user, bizrate, device, source, theme } = sessionInfo;

	const payload = {
		userInfo: {
			firstName: user.firstName,
			lastName: user.lastName,
			address1: user.address1,
			address2: user.address2,
			city: user.city,
			state: user.state,
			zip: user.zip,
			email: user.email,
		},
		billingInfo: {
			cvv: billingInfo.cvv,
			ccType: billingInfo.ccType,
			ccNumber: billingInfo.ccNumber,
			ccExpMonth: billingInfo.ccExpMonth,
			ccExpYear: billingInfo.ccExpYear,
		},
		items: cart.map((item) => {
			return {
				offerPK: item.offerPK,
			};
		}),
	};

	const apiQueryParams = `acceptOfferParams=${encodeURIComponent(JSON.stringify(payload))}`;

	return fetch(`${apiURL}/order/acceptoffer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		credentials,
		body: apiQueryParams,
	});
}

export function acceptUpsell(cart) {
	const payload = {
		items: cart.map((item, index) => {
			return {
				offerPK: item.offerPK,
			};
		}),
	};

	const apiQueryParams = `acceptUpsellParams=${encodeURIComponent(JSON.stringify(payload))}`;

	return fetch(`${apiURL}/upsell/acceptupsell`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		credentials,
		body: apiQueryParams,
	});
}

export function destroySession() {
	const encodedParams = encodeURIComponent('{"eventId":"1"}');
	const apiQueryParams = `requestParams=${encodedParams}`;

	return fetch(`${apiURL}/event/processevent`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		credentials,
		body: apiQueryParams,
	});
}
