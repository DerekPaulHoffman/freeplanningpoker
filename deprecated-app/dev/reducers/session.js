import {
	UPDATE_USER_NAME,
	UPDATE_SESSION_ID,
	ENTER_ROOM,
	LOGOUT,
	CLEAR_ROOM,
} from 'Actions/session.js';

const initialState = {
	userName: '',
	sessionId: '',
	room: '',
};

const sessionReducer = (state, action) => {
	switch (action.type) {
		case ENTER_ROOM:
		case UPDATE_SESSION_ID:
		case UPDATE_USER_NAME: {
			return {
				...state,
				[action.param]: action.val,
			};
		}
		case LOGOUT: {
			return {
				...state,
				userName: '',
				sessionId: '',
				room: '',
			}
		}
		case CLEAR_ROOM: {
			return { 
				...state,
				room: '',
			}
		}

		default:
			return state;
	}
};

const rootSessionReducer = (state = initialState, action) => {
	return sessionReducer(state, action);
};

export default rootSessionReducer;
