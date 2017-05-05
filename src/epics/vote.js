import { Observable } from 'rxjs/Observable'
import { receiveVote, dummy } from '../actions'

export const subscribeVote = action$ => action$
	.ofType('SUBSCRIBE_VOTE')
	.mergeMap(() =>
		Observable.fromEvent(
			firebase.database().ref('vote'),
			'value'
		).map(snapshot => snapshot.val()).map(receiveVote)
			.takeUntil(action$.ofType('SUBSCRIBE_VOTE')) // clear at next action
	)

export const startVote = action$ => action$
	.ofType('START_VOTE')
	.map(action => action.payload.optionCount)
	.mergeMap(optionCount => {
		let optionVote = {}
		for (let i = 0; i < optionCount; i++)
			optionVote[i] = 0
		return Observable.fromPromise(
			firebase.database().ref('vote').set({
				start: new Date().getTime(),
				optionVote: optionVote
			})
		).map(dummy)
	})

export const sendVote = action$ => action$
	.ofType('SEND_VOTE')
	.map(action => action.payload.addVote)
	.mergeMap(addVote => Observable.fromPromise(
		firebase.database().ref('vote/optionVote').transaction(data => {
			Object.keys(addVote).forEach((item, i) => data[i] += addVote[i])
			return data
		}).then(() => {
			const total = Object.keys(addVote).reduce((total, key) => parseInt(total) + parseInt(addVote[key]), 0)
			let newUserInfo
			firebase.database().ref('user/' + localStorage.userName).transaction(function (user) {
				user.totalVoteCount = user.totalVoteCount ? user.totalVoteCount + total : total
				newUserInfo = { ...user }
				return user
			})
			firebase.database().ref('record/' + localStorage.userName).transaction(function (user) {
				user = user || {}
				user.currVoteCount = user.currVoteCount ? user.currVoteCount + total : total
				return { ...newUserInfo, ...user }
			})
		})).map(dummy)
	)