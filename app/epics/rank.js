import { Observable } from 'rxjs/Observable'
import { receiveRank, dummy } from '../actions'

function genCountStream(curr, total) {
	return Observable.fromEvent(
		firebase.database().ref('record').orderByChild(curr).limitToLast(6),
		'value'
	).map(snap => {
		if (!snap.val())
			return {}
		// convert to array for sort
		const arr = Object.keys(snap.val()).map(k => ({
			name: k,
			...snap.val()[k]
		})).filter(item => item.name != '祥平君')
		return { [curr]: arr.sort((a, b) => a[curr] == b[curr] ? a[total] < b[total] : a[curr] < b[curr]) }
	})
}

export const subscribeRank = action$ => action$
	.ofType('SUBSCRIBE_RANK')
	.mergeMap(() =>
		genCountStream('watchCount', 'watchCount')
			.merge(genCountStream('currChatCount', 'totalChatCount'))
			.merge(genCountStream('currStickerCount', 'totalStickerCount'))
			.merge(genCountStream('currEffectCount', 'totalEffectCount'))
			.merge(genCountStream('currVoteCount', 'totalVoteCount'))
			.map(receiveRank).takeUntil(action$.ofType('SUBSCRIBE_RANK')) // clear at next action
	)