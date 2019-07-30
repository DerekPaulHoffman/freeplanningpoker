import ReactGA from 'react-ga';

const numeric = new RegExp('^\\d+$', 'i'); // Strictly numbers.

const typeError = (alertMsg = false) => {
	if (alertMsg) {
		alert('Please enter a valid credit card type.');
	}
};

const numError = (alertMsg = false) => {
	if (alertMsg) {
		alert('Please enter a valid credit card number.');
	}
};

const expError = (alertMsg = false) => {
	if (alertMsg) {
		alert('Please select a valid expiration date.');
	}
};

const cvvError = (alertMsg = false, type) => {
	if (alertMsg) {
		if (type === 'empty') {
			alert('Please provide your card\'s 3- or 4-digit Security Code.');
		} else if (type === 'invalid') {
			alert('Please enter a valid Card Number and/or 3- or 4-digit Security Code.');
		}
		ReactGA.event({
			category: 'CVV',
			action: 'Validation message shown',
		});
	}
};

const modTen = (alert = false, ccNum) => {
	if (ccNum.length > 19 || !numeric.test(ccNum)) {
		numError(alert);
		return false;
	}

	let nCheck = 0;
	let nDigit = 0;
	let bEven = false;

	for (let n = ccNum.length - 1; n >= 0; n -= 1) {
		const cDigit = ccNum.charAt(n);
		nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) {
				(nDigit -= 9);
			}
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	if (!((nCheck % 10) === 0)) {
		numError(alert);
		return false;
	}
	return true;
};

const isValidCC = (alert = false, ccNum, ccType) => {
	const discoverBinRanges14 = [
		[30000000, 30599999],
		[30950000, 30959999],
		[36000000, 36999999],
		[38000000, 39999999],
	];
	const discoverBinRanges16 = [
		[35280000, 35899999],
		[60110000, 60110999],
		[60112000, 60114999],
		[60117400, 60117499],
		[60117700, 60117999],
		[60118600, 60119999],
		[62212600, 62292599],
		[62400000, 62699999],
		[62820000, 62889999],
		[64400000, 65999999],
	];
	const masterBinRanges = [
		[510000, 559999],
		[222100, 272099],
	];

	if (ccType === '') {
		typeError(alert);
		return false;
	}

	if (!numeric.test(ccNum) || ccNum.length < 13 || ccNum.length > 16) {
		numError(alert);
		return false;
	}

	const first = parseInt(ccNum.substr(0, 1), 10);
	const second = parseInt(ccNum.substr(1, 1), 10);
	const firstSix = parseInt(ccNum.substr(0, 6), 10);
	const firstEight = parseInt(ccNum.substr(0, 8), 10);

	if (ccType === 'visa') {
		if ((first !== 4 || (ccNum.length !== 13 && ccNum.length !== 16))) {
			numError(alert);
			return false;
		}
	} else if (ccType === 'master') {
		if (
			!masterBinRanges.some((range) => {
				return (firstSix >= range[0] && firstSix <= range[1]);
			})
		) {
			numError(alert);
			return false;
		}
	} else if (ccType === 'amex') {
		if (ccNum.length !== 15 || (first !== 3 || (second !== 4 && second !== 7))) {
			numError(alert);
			return false;
		}
	} else if (ccType === 'discover') {
		let discoverBinRanges;

		if (ccNum.length === 14) {
			discoverBinRanges = discoverBinRanges14;
		} else if (ccNum.length === 16) {
			discoverBinRanges = discoverBinRanges16;
		} else {
			numError(alert);
			return false;
		}

		if (
			!discoverBinRanges.some((range) => {
				return (firstEight >= range[0] && firstEight <= range[1]);
			})
		) {
			numError(alert);
			return false;
		}
	}

	return true;
};

const isValidCCDate = (alert = false, ccMon, ccYear) => {
	ccMon = parseInt(ccMon, 10);
	ccYear = parseInt(ccYear, 10);
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();

	if (ccYear < currentYear || ccMon.length === 0 || (ccYear === currentYear && ccMon < currentMonth)) {
		expError(alert);
		return false;
	}

	return true;
};

const isValidCVV = (alert = false, cvv, ccType) => {
	if (cvv.length < 3) {
		cvvError(alert, 'empty');
		return false;
	} else if ((ccType === 'amex' && cvv.length !== 4) || (ccType !== 'amex' && cvv.length !== 3)) {
		cvvError(alert, 'invalid');
		return false;
	}

	return true;
};

const checkCardType = (ccNum, callback) => {
	const first = parseInt(ccNum.substr(0, 1), 10);
	const firstTwo = parseInt(ccNum.substr(0, 2), 10);
	const firstThree = parseInt(ccNum.substr(0, 3), 10);
	const firstFour = parseInt(ccNum.substr(0, 4), 10);
	const firstSix = parseInt(ccNum.substr(0, 6), 10);

	const result = {
		cardType: '',
	};

	if (first === 4) {
		result.cardType = 'visa';
	} else if (firstTwo <= 55 && firstTwo >= 50) {
		result.cardType = 'master';
	} else if (firstTwo === 34 || firstTwo === 37) {
		result.cardType = 'amex';
	} else if (
		firstFour === 6011 ||
		(firstSix >= 622126 && firstSix <= 622925) ||
		(firstThree >= 644 && firstThree <= 649) ||
		firstTwo === 65
	) {
		result.cardType = 'discover';
	}

	if (callback && typeof callback === 'function') {
		callback(result);
	}
};

export {
	modTen,
	isValidCC,
	isValidCCDate,
	isValidCVV,
	checkCardType,
};
