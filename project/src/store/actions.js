import { getVideoTime, FINGERPRINT, preservedUsers } from '../common'
import shortid from 'shortid'
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
let unsubscribeChat = () => { }

export default {
	notify({ }) { },
	subscribeData({ state, commit, dispatch }) {
		// Is me banned?
		firestore.doc('system/ban').onSnapshot(doc => {
			if (doc.data().fingerprint.find(hash => hash == FINGERPRINT)) {
				dispatch('logout')
				dispatch('notify', { type: 'error', text: 'You got banned!' })
			}
		})
		// all users
		firestore.collection('user').onSnapshot(snap => {
			let allUsers = { ...preservedUsers }
			snap.forEach(doc => allUsers[doc.id] = doc.data())
			commit('setAllUsers', allUsers)
		})
		// online user
		setInterval(() => dispatch('sendHeartbeat'), 120000)
		firestore.doc('activity/online').onSnapshot(doc => commit('setOnlineUids', Object.keys(doc.data())))
		// system info
		firestore.doc('system/stream').onSnapshot(doc => {
			// chat
			if (state.stream.time != doc.data().time) {
				unsubscribeChat()
				unsubscribeChat = firestore.collection(`allChat/${doc.data().time}/chat-line`).onSnapshot(snap => {
					commit('setChatLines', snap.docs.map(doc => doc.data()).reverse())
				})
			}
			commit('setStream', doc.data())
			dispatch('checkTrophy')
		})
		// my login info
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		firebase.auth().onAuthStateChanged(async user => {
			try {
				if (user) {
					commit('setMyUid', user.uid)
					commit('updateUiMode', { account: 'MY_INFO' })
					try {
						await firestore.collection('adminUser').get()
						commit('setIsAdmin', true)
					} catch (error) {
						if ("permission-denied" == error.code)
							commit('setIsAdmin', false)
						else
							throw error
					}
				} else {
					commit('setIsAdmin', false)
					commit('setMyUid', null)
					commit('updateUiMode', { account: 'ANONYMOUS' })
				}
				dispatch('sendHeartbeat')
			} catch (error) {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
		})
		// vote
		firestore.doc("system/vote").onSnapshot(doc => {
			if (doc.data().ended)
				setTimeout(() => commit('updateUiMode', { vote: false }), 3000)
			else
				commit('updateUiMode', { vote: true })
			if (!state.voteInfo.time || (doc.data().time && state.voteInfo.time.seconds != doc.data().time.seconds))
				commit('initVoteRoster', doc.data().optionCount)
			commit('setVoteInfo', doc.data())
		})
		firestore.doc("activity/vote").onSnapshot({ includeMetadataChanges: true }, doc => {
			if (doc.metadata.hasPendingWrites)
				return
			for (const [uid, votes] of Object.entries(doc.data()))
				commit('addVotes', { uid, votes })
		})
		// quiz
		firestore.doc("system/quiz").onSnapshot(doc => {
			if (doc.data().ended) {
				if (state.quizInfo.A === state.myAnswer)
					dispatch('addExp', 12)
				setTimeout(() => commit('updateUiMode', { quiz: false }), 3000)
			} else {
				commit('setMyAnswer', null)
				commit('updateUiMode', { quiz: true })
			}
			if (!state.quizInfo.time || (doc.data().time && state.quizInfo.time.seconds != doc.data().time.seconds))
				commit('initQuizRoster', doc.data().OP)
			commit('setQuizInfo', doc.data())
		})
		firestore.doc("activity/quiz").onSnapshot({ includeMetadataChanges: true }, doc => {
			if (doc.metadata.hasPendingWrites)
				return
			for (const [uid, answer] of Object.entries(doc.data()))
				commit('addAnswer', { uid, answer })
		})
		// history video
		// fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBCYPReX74lujmX9tg8AiM-OFGqmKYMZkU&channelId=UCLeQT6hvBgnq_-aKKlcgj1Q&part=snippet,id&order=date&maxResults=20')
		// 	.then(res => res.json())
		// 	.then(data => commit('setHistoryVideo', data.items.filter(item => item.id.videoId)))
	},
	async saveMyExp({ state }, payload) {
		await firestore.collection('user').doc(state.myUid).update({ exp: payload })
	},
	async saveMyAvatar({ state }, payload) {
		await firestore.collection('user').doc(state.myUid).update({ avatarSelected: payload })
	},
	async saveMyBestVoteRecord({ state }, payload) {
		await firestore.collection('user').doc(state.myUid).update({ bestVoteRecord: payload })
	},
	async saveMyAvatarList({ state }, payload) {
		await firestore.collection('user').doc(state.myUid).update({ avatarList: payload })
	},
	async getTrophy({ state, getters, dispatch }, payload) {
		if (getters.myInfo.trophy.includes(payload.id))
			return
		await firestore.collection('user').doc(state.myUid).update({ trophy: [...getters.myInfo.trophy, payload.id] })
		dispatch('addExp', 100)
		dispatch('notify', { data: { symbol: 'trophy' }, text: payload.text })
	},
	async addMyViewedStream({ state, getters }, payload) {
		await firestore.collection('user').doc(state.myUid).update({ viewedStream: [...getters.myInfo.viewedStream, payload] })
	},
	addExp({ getters, dispatch }, payload) {
		const exp = getters.myInfo.exp + payload
		if (Math.floor(exp / 100) > Math.floor(getters.myInfo.exp / 100)) {
			const nextAvatar = getters.randomNextAvatar
			if (null === nextAvatar) {
				dispatch('notify', { text: '升滿了?! 你真的有認真在看直播嗎?' })
			} else {
				dispatch('saveMyAvatarList', [...getters.myInfo.avatarList, nextAvatar])
				dispatch('notify', { data: { avatar: nextAvatar }, text: '升級! 獲得新角色!' })
			}
		}
		dispatch('saveMyExp', exp)
	},
	checkTrophy({ getters, state, dispatch }) {
		if (!getters.myInfo.name)
			return
		if ('STARTED' == state.stream.status && !getters.myInfo.viewedStream.includes(state.stream.time)) {
			if (!getters.myInfo.trophy.includes('WATCH_FIRST_TIME'))
				dispatch('getTrophy', { text: '第一次來看直播！', id: 'WATCH_FIRST_TIME' })
			else
				dispatch('notify', { data: { symbol: 'trophy' }, text: '上來看直播！' })
			dispatch('addExp', 100)
			if (!state.isAdmin)
				setTimeout(() => dispatch('sayHello'), 5000)
			dispatch('addMyViewedStream', state.stream.time)
		}
	},
	async sendHeartbeat({ state, getters }) {
		const anonymousUid = `${FINGERPRINT} ${state.anonymousAvatar}`
		if (state.myUid) {
			await firestore.doc('activity/online').update({
				[state.myUid]: firebase.firestore.FieldValue.serverTimestamp()
			})
			if (bowser.name != getters.myInfo.browser)
				firestore.collection('user').doc(state.myUid).update({ browser: bowser.name })
			await firestore.doc('activity/online').update({
				[anonymousUid]: firebase.firestore.FieldValue.delete()
			})
		} else {
			await firestore.doc('activity/online').update({
				[anonymousUid]: firebase.firestore.FieldValue.serverTimestamp()
			})
		}
	},
	async loginAdmin({ state, dispatch }, payload) {
		try {
			const me = Object.values(state.allUsers).find(user => user.name == payload.name)
			await firebase.auth().signInWithEmailAndPassword(me.email, payload.password)
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	async loginVisitor({ dispatch, state }, payload) {
		try {
			for (const [i, user] of Object.entries(preservedUsers))
				if (payload == user.name)
					throw { code: 'auth/wrong-password' }
			const me = Object.values(state.allUsers).find(user => user.name == payload)
			if (me) {
				await firebase.auth().signInWithEmailAndPassword(me.email, 'dummy-password')
			} else {
				// create user
				const email = `${shortid.generate()}@mail.net`
				const user = await firebase.auth().createUserWithEmailAndPassword(email, 'dummy-password')
				await firestore.collection('user').doc(user.uid).set({
					name: payload,
					uid: user.uid,
					avatarList: [state.anonymousAvatar],
					avatarSelected: state.anonymousAvatar,
					exp: 0,
					email: email,
					viewedStream: [],
					trophy: []
				})
				dispatch('checkTrophy')
			}
		} catch (error) {
			if ('auth/wrong-password' == error.code) {
				dispatch('notify', { type: 'error', text: '暱稱已被使用!' })
				dispatch('promptLogin')
			} else {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
		}
	},
	async logout({ state, dispatch, commit }) {
		try {
			commit('generateAnonymousAvatar')
			await firestore.doc('activity/online').update({
				[state.myUid]: firebase.firestore.FieldValue.delete()
			})
			await firebase.auth().signOut()
			commit('updateUiMode', { selectAvatar: false })
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	changeAvatar({ dispatch, commit }, payload) {
		dispatch('saveMyAvatar', payload)
		commit('updateUiMode', { selectAvatar: false })
	},
	async sendChat({ dispatch, state }, payload) {
		let index = (parseInt('zzz', 36) - state.chatLines.length).toString(36)
		index += payload.text.substr(0, 10).replace(/\//g, '／')
		const time = getVideoTime()
		await firestore.collection('allChat').doc(state.stream.time).collection('chat-line').doc(index).set({
			...payload,
			uid: payload.uid || state.myUid,
			fingerprint: FINGERPRINT,
			videoTime: Math.floor(time / 3600) + ':' + Math.floor(time % 3600 / 60) + ':' + Math.floor(time % 3600 % 60),
			id: shortid.generate(),
			time: firebase.firestore.FieldValue.serverTimestamp()
		})
		if ('STARTED' == state.stream.status)
			dispatch('addExp', 3)
	},
	async sendSticker({ dispatch, state }, payload) {
		let index = (parseInt('zzz', 36) - state.chatLines.length).toString(36)
		const time = getVideoTime()
		await firestore.collection('allChat').doc(state.stream.time).collection('chat-line').doc(index).set({
			...payload,
			uid: payload.uid || state.myUid,
			fingerprint: FINGERPRINT,
			videoTime: Math.floor(time / 3600) + ':' + Math.floor(time % 3600 / 60) + ':' + Math.floor(time % 3600 % 60),
			id: shortid.generate(),
			time: firebase.firestore.FieldValue.serverTimestamp()
		})
		if ('STARTED' == state.stream.status)
			dispatch('addExp', 3)
	},
	promptLogin({ commit, dispatch }) {
		commit('updateUiMode', { account: 'LOGIN' })
		dispatch('notify', { type: 'warn', text: '輸入暱稱才能繼續喲!', data: { symbol: 'exclamation-triangle' } })
	},
	promptSelectAvatar({ commit }) {
		commit('updateUiMode', { selectAvatar: true })
	},
	async saveGameTitle({ dispatch }, payload) {
		await firestore.doc('system/stream').update({
			gameTitle: payload
		})
		dispatch('notify', { text: '已更新直播主題' })
	},
	async saveGameUrl({ dispatch }, payload) {
		await firestore.doc('system/stream').update({
			gameUrl: payload
		})
		dispatch('notify', { text: '已更新直播主題的連結' })
	},
	async saveGameDescription({ dispatch }, payload) {
		await firestore.doc('system/stream').update({
			gameDescription: payload
		})
		dispatch('notify', { text: '已更新直播主題的簡述' })
	},
	async saveVideoUrl({ dispatch, state }, payload) {
		await firestore.doc('system/stream').set({
			...state.stream,
			videoUrl: convertToEmbeded(payload)
		})
		dispatch('notify', { text: '已更新直播影片網址' })
		function convertToEmbeded(url) {
			let arr = /\/\/youtu.be\/(.*)/.exec(url)
			if (arr)
				return convertToYoutube(arr[1])
			arr = /\/\/www\.youtube\.com\/watch\?v=([^&]+)/.exec(url)
			if (arr)
				return convertToYoutube(arr[1])
			arr = /\/\/www\.youtube\.com\/embed\/([^?]+)/.exec(url)
			if (arr)
				return convertToYoutube(arr[1])
		}
	},
	async savePlanToStartAt({ dispatch }, payload) {
		await firestore.doc('system/stream').update({
			planToStartAt: payload
		})
		dispatch('notify', { text: '已更新預計開始時間' })
	},
	async startStream({ }) {
		await firestore.doc('system/stream').update({
			status: 'STARTED'
		})
	},
	async streamWillStart({ }) {
		await firestore.doc('system/stream').update({
			time: new Date().toLocaleString().replace(/\//g, '-'),
			status: 'WILL_START'
		})
	},
	async stopStream({ }) {
		await firestore.doc('system/stream').update({
			status: 'ENDED'
		})
	},
	async startVote({ }, payload) {
		await firestore.doc('system/vote').set({
			time: firebase.firestore.FieldValue.serverTimestamp(),
			optionCount: payload,
			ended: false
		})
		await firestore.doc('activity/vote').set({})
	},
	async sendVote({ state, dispatch }, payload) {
		try {
			await firestore.doc('activity/vote').update({ [state.myUid]: payload })
			const total = payload.reduce((acc, val) => acc + val)
			let code = []
			payload.forEach((count, i) => {
				if (count)
					code.push(String.fromCharCode(65 + i))
			})
			dispatch('sendChat', { text: `${code.join('/')} +${total}票！` })
			if (total > 20)
				dispatch('getTrophy', { text: '快手指！投超過20票！', id: 'QUICK_VOTE_FINGER' })
			dispatch('addExp', total - 3)
		} catch (error) {
			if ('permission-denied' == error.code)
				return
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	async sendAnswer({ state, dispatch, commit }, payload) {
		try {
			await firestore.doc('activity/quiz').update({ [state.myUid]: payload })
			if ('STARTED' == state.stream.status)
				dispatch('sendChat', { text: `${state.quizInfo.OP[payload]}+1` })
			commit('setMyAnswer', payload)
		} catch (error) {
			if ('permission-denied' == error.code)
				return
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	playHistory({ commit }, payload) {
		commit('setSelectedVideoUrl', convertToYoutube(payload))
	},
	sayHello({ dispatch }) {
		const helloBank = [
			"安安ice 安安祥平 平安喜樂",
			"YO~ice~祥平",
			"ice、祥平我來啦！",
			"ㄤㄤice&祥平&大家！",
			"哈囉大家～",
			"哈囉ice&祥平",
			"大家空邦挖～ice和祥平空邦挖～",
			"上來看實況喔耶！",
			"Hi~~~~ice&祥平",
			"(拉椅子、望向ice和祥平)",
			"(悄悄地登入)",
			"(用力地揮手)",
		]
		dispatch('sendChat', { text: helloBank[Math.floor(Math.random() * helloBank.length)] })
	},
	async runTest({ state, dispatch, commit }) {
		await firestore.doc('system/quizHistory').set({})
	}
}

function convertToYoutube(id) { return '//www.youtube.com/embed/' + id + '?enablejsapi=1' }