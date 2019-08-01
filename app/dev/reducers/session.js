import {
	UPDATE_USER_NAME,
} from 'Actions/session.js';

const initialState = {
	userName: '',
};

const sessionReducer = (state, action) => {
	console.log(state, action)
	switch (action.type) {
		case UPDATE_USER_NAME: {
			return {
				...state,
				userName: action.userName,
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
