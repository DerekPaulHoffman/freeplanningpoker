export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const UPDATE_SESSION_ID = 'UPDATE_SESSION_ID';
export const ENTER_ROOM = 'ENTER_ROOM';
export const CLEAR_ROOM = 'CLEAR_ROOM';
export const LOGOUT = 'LOGOUT';

export function updateUserName(userName) {
	return {
		type: UPDATE_USER_NAME,
		param: 'userName',
		val: userName,
	}
}
export function updateSessionId(sessionId) {
	return {
		type: UPDATE_USER_NAME,
		param: 'sessionId',
		val: sessionId,
	}
}

export function enterRoom(room) {
	return {
		type: ENTER_ROOM,
		param: 'room',
		val: room,
	}
}

export function clearRoomState() {
	return { 
		type: CLEAR_ROOM,
	}
}

export function logout() {
	return {
		type: LOGOUT,
	}
}