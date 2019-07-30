// Dependencies
import {
	createStore,
	applyMiddleware,
	compose,
} from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

// Reducers
import appStore from 'Reducers/rootReducer.js';

// Helper
import { loadState, saveState } from './localStorage';

const configureStore = () => {
	const persistedState = loadState();
	const store = createStore(
		appStore,
		persistedState,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f,
		),
	);

	store.subscribe(throttle(() => {
		saveState(store.getState());
	}, 1000)); // Wrapping this subscribe with throttle ensures that it will only be called once every 1,000 milliseconds.

	return store;
};

export default configureStore;
