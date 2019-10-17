const localEnvCheck = () => {
	if (window.location.hostname.indexOf('localhost') !== -1) {
		return true;
	}

	return false;
};

const credentials = (localEnvCheck()) ? 'include' : 'same-origin';
const apiURL = (localEnvCheck()) ? 'https://staging-mdc.magazinediscountcenter.com/swatapp/v2.0' : '/swatapp/v2.0';

export {
	localEnvCheck,
	credentials,
	apiURL,
}

