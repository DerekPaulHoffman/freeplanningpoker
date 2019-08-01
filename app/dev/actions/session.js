export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const UPDATE_SESSION_ID = 'UPDATE_SESSION_ID';

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