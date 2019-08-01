export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';

export function updateUserName(userName) {
	return {
		type: UPDATE_USER_NAME,
		userName,
	}
}