import {
	UPDATE_USER_NAME,
	UPDATE_SESSION_ID,
} from 'Actions/session.js';

const initialState = {
	userName: '',
	sessionId: '',
};

const sessionReducer = (state, action) => {
	switch (action.type) {
		case UPDATE_SESSION_ID:
		case UPDATE_USER_NAME: {
			return {
				...state,
				[action.param]: action.val,
			};
		}
		default:
			return state;
	}
};

const rootSessionReducer = (state = initialState, action) => {
	return sessionReducer(state, action);
};

export default rootSessionReducer;
