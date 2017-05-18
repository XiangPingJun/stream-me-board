export default function vote(state = { optionVote: {} }, action) {
	switch (action.type) {
		case 'RECEIVE_VOTE':
			return action.payload.vote || state
		default:
			return state
	}
}
