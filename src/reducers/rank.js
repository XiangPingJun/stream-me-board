export default function rank(state = {}, action) {
	switch (action.type) {
		case 'RECEIVE_RANK':
			return {
				...state,
				...action.payload.rank
			}
		default:
			return state
	}
}

