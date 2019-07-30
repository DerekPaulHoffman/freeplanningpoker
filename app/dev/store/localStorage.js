export const loadState = () => {
	try {
		// ! Update the value in localStorage.getItem('') to be application specific. Value 'state' will break if a user goes to this template and Bizrate.
		const serializedState = localStorage.getItem('tm-state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		// ! Update the value in localStorage.setItem('') to be application specific. Value 'state' will break if a user goes to this template and Bizrate.
		localStorage.setItem('tm-state', serializedState);
	} catch (error) {
		// Ignore errors for now
	}
};
