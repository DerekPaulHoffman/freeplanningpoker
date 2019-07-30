export const UPDATE_PAGE_VAL = 'UPDATE_PAGE_VAL';

export function updatePageVal(page) {
	return {
		type: UPDATE_PAGE_VAL,
		page,
	}
}