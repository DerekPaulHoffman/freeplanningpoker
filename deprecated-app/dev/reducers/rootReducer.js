import { combineReducers } from 'redux';
import rootSessionReducer from './session.js';

const appStore = combineReducers({
	session: rootSessionReducer,
});

export default appStore;
