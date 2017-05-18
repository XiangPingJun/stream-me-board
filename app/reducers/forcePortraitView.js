export default function forcePortraitView(state = false, action) {
	switch (action.type) {
		case 'TOGGLE_VIEW':
			return !state
		default:
			return state
	}
}
