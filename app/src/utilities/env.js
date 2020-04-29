const localEnvCheck = () => {
	if (window.location.hostname.indexOf('localhost') !== -1) {
		return true;
	}

	return false;
};

const credentials = (localEnvCheck()) ? 'include' : 'same-origin';

export {
	localEnvCheck,
	credentials,
}

