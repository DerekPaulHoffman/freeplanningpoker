const alertError = (field) => {
	let alertMsg = 'Please enter a valid';

	alertMsg = (field === 'firstName') ? (
		`${alertMsg} first name.`
	) : (field === 'lastName') ? (
		`${alertMsg} last name.`
	) : (field === 'address1') ? (
		`${alertMsg} address.`
	) : (field === 'zip') ? (
		`${alertMsg} 5 digit zip code.`
	) : (field === 'state') ? (
		`${alertMsg} state.`
	) : (field === 'city') ? (
		`${alertMsg} city.`
	) : (field === 'email') ? (
		`${alertMsg} email address.`
	) : 'Please check your form information to ensure that it is formatted correctly.';

	document.getElementById(field).focus();
	alert(alertMsg);
};

const validateField = (field, value) => {
	const alphanumeric = new RegExp("^[\\w\\s\\#\\'\\.\\,\\-\\/]+$", 'i'); // Any alphanumeric character, hash, singlequote, period, comma, dash, forward slash, or space.
	const alphabet = new RegExp('^[\\a-z\\A-Z\\s]+$', 'i'); // Strictly letters.
	const numeric = new RegExp('^[\\d]+$', 'i'); // Strictly numbers.
	const emailRange = new RegExp('^\\S+@\\S+\\.\\S+$', 'i'); // Requires characters before @ and the first period and additional characters after final period.

	switch (field) {
		case 'firstName':
		case 'lastName':
		case 'city':
		case 'state':
			if((value.length < 1 || !alphabet.test(value))) {
				alertError(field);
				return false;
			}
			return true;
		case 'address1':
			if((value.length < 1 || !alphanumeric.test(value))) {
				alertError(field);
				return false;
			}
			return true;
		case 'zip':
			if((value.length < 5 || !numeric.test(value))) {
				alertError(field);
				return false;
			}
			return true;
		case 'email':
			if((value.length < 1 || !emailRange.test(value))) {
				alertError(field);
				return false;
			}
			return true;
		case 'phone':
			if((value.length > 1 || !numeric.test(value))) {
				alertError(field);
				return false;
			}
			return true;
		default:
			// Do nothing.
	}
};

export default (userInfo) => {
	const userInfoArray = Object.keys(userInfo);
	userInfoArray.splice(userInfoArray.indexOf('formSubmitted')); // Remove formSubmitted from array because it is not part of the form validation.
	userInfoArray.splice(userInfoArray.indexOf('_errors'));
	if(
		userInfoArray.every((field) => {
			if(field === 'address2' || field === 'phone') {
				return true;
			} else if(validateField(field, userInfo[field])) {
				return true;
			}
		})
	) {
		return true;
	}

	return false;
};
