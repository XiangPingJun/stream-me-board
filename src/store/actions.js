import { getVideoTime, FINGERPRINT } from '../common'
import shortid from 'shortid'
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
let unsubscribeChat = () => { }

export default {
	notify: ({ }, payload) => { },
	saveMyInfo: ({ state, dispatch, commit }, payload) => {
		firestore.collection('user').doc(state.myUid).set(payload)
			.catch(error => {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			})
	},
	addExp: ({ getters, dispatch }, payload) => {
		if (payload > 100)
			dispatch('notify', { type: 'error', text: `unsupport addExp ${payload}` })
		getters.myInfo.exp += payload
		if (getters.myInfo.exp >= 100) {
			getters.myInfo.level++
			getters.myInfo.exp -= 100
			const nextAvatar = getters.randomNextAvatar
			if (null === nextAvatar) {
				dispatch('notify', { text: '升滿了?! 你真的有認真在看直播嗎?' })
			} else {
				getters.myInfo.avatarList.push(nextAvatar)
				dispatch('notify', { data: { avatar: nextAvatar }, text: '升級! 獲得新角色!' })
			}
		}
		dispatch('saveMyInfo', getters.myInfo)
	},
	checkTrophy: ({ getters, dispatch }) => {
		if (!getters.myInfo.name)
			return
		if (getters.stream.streaming && !getters.myInfo.viewedStream.includes(getters.stream.time)) {
			getters.myInfo.viewedStream.push(getters.stream.time)
			if (!getters.myInfo.trophy.includes('WATCH_FIRST_TIME')) {
				getters.myInfo.trophy.push('WATCH_FIRST_TIME')
				notify('第一次來看直播！')
			}
			dispatch('saveMyInfo', getters.myInfo)
			dispatch('addExp', 100)
		}
		function notify(msg) {
			dispatch('notify', { data: { symbol: 'trophy' }, text: msg })
		}
	},
	sendHeartbeat: ({ state, getters }) => {
		if (state.myUid) {
			firestore.collection('onlineUser').doc(state.myUid).set({
				uid: state.myUid,
				heartbeat: firebase.firestore.FieldValue.serverTimestamp()
			})
			firestore.collection('onlineUser').doc(FINGERPRINT).delete()
		} else {
			firestore.collection('onlineUser').doc(FINGERPRINT).set({
				avatarSelected: getters.anonymousAvatar,
				heartbeat: firebase.firestore.FieldValue.serverTimestamp()
			})
		}
	},
	subscribeData: ({ state, commit, dispatch, getters }) => {
		// Is me banned?
		firestore.doc('system/ban').onSnapshot(doc => {
			if (doc.data().fingerprint.find(hash => hash == FINGERPRINT)) {
				dispatch('logout')
				dispatch('notify', { type: 'error', text: 'You got banned!' })
			}
		})
		// all users
		firestore.collection('user').onSnapshot(snap => {
			let allUsers = {}
			snap.forEach(doc => allUsers[doc.id] = doc.data())
			commit('setAllUsers', allUsers)
		})
		// online user
		setInterval(() => dispatch('sendHeartbeat'), 60000)
		firestore.collection('onlineUser').onSnapshot(snap => {
			commit('setOnlineUser', snap.docs.map(doc => {
				const data = doc.data()
				if (data.uid)
					return getters.allUsers[data.uid]
				else
					return { avatarSelected: data.avatarSelected }
			}))
			commit('setUiMode', { playground: true })
		})
		// system info
		firestore.doc('system/stream').onSnapshot(doc => {
			const stream = doc.data()
			if (state.stream.time != stream.time) {
				unsubscribeChat()
				unsubscribeChat = firestore.collection(`allChat/${stream.time}/chat-line`).onSnapshot(snap => {
					commit('setChatLines', snap.docs.map(doc => doc.data()).reverse())
					commit('setUiMode', { chat: true })
				})
			}
			commit('setStream', stream)
			dispatch('checkTrophy')
		})
		firestore.doc("system/info").onSnapshot(doc => commit('setSystemInfo', doc.data()))
		// my login info
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		firebase.auth().onAuthStateChanged(async user => {
			try {
				if (user) {
					commit('setMyUid', user.uid)
					commit('setUiMode', { account: 'MY_INFO' })
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
					commit('setUiMode', { account: 'ANONYMOUS' })
				}
				dispatch('sendHeartbeat')
			} catch (error) {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
		})
	},
	loginAdmin: async ({ getters, dispatch }, payload) => {
		try {
			const me = Object.values(getters.allUsers).find(user => user.name == payload.name)
			await firebase.auth().signInWithEmailAndPassword(me.email, payload.password)
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	loginVisitor: async ({ dispatch, getters }, payload) => {
		const name = payload
		try {
			const me = Object.values(getters.allUsers).find(user => user.name == name)
			if (me) {
				await firebase.auth().signInWithEmailAndPassword(me.email, 'dummy-password')
			} else {
				// create user
				const email = `${shortid.generate()}@mail.net`
				const user = await firebase.auth().createUserWithEmailAndPassword(email, 'dummy-password')
				await firestore.collection('user').doc(user.uid).set({
					name: name,
					uid: user.uid,
					avatarList: [getters.anonymousAvatar],
					avatarSelected: getters.anonymousAvatar,
					level: 1,
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
	logout: async ({ state, dispatch, commit }) => {
		try {
			commit('generateAnonymousAvatar')
			await firestore.collection('onlineUser').doc(state.myUid).delete()
			await firebase.auth().signOut()
			commit('setUiMode', { selectAvatar: false })
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	changeAvatar: ({ dispatch, commit, getters }, payload) => {
		if (!getters.myInfo.avatarList.includes(payload))
			return
		getters.myInfo.avatarSelected = payload
		dispatch('saveMyInfo', getters.myInfo)
		commit('setUiMode', { selectAvatar: false })
	},
	submitChat: async ({ dispatch, commit, state }, payload) => {
		try {
			let index = (parseInt('zzz', 36) - state.chatLines.length).toString(36)
			index += payload.text.substr(0, 10)
			const time = getVideoTime()
			await firestore.collection(`allChat/${state.stream.time}/chat-line`).doc(index).set({
				...payload,
				fingerprint: FINGERPRINT,
				videoTime: Math.floor(time / 3600) + ':' + Math.floor(time % 3600 / 60) + ':' + Math.floor(time % 3600 % 60),
				id: shortid.generate(),
			})
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	promptLogin: ({ commit, dispatch }) => {
		commit('setUiMode', { account: 'LOGIN' })
		dispatch('notify', { type: 'warn', text: '要先輸入暱稱才能繼續喲！', data: { symbol: 'exclamation-triangle' } })
	},
	promptSelectAvatar: ({ commit }) => {
		commit('setUiMode', { selectAvatar: true })
	},
	saveGameTitle: async ({ dispatch, state }, payload) => {
		try {
			await firestore.doc('system/stream').set({
				...state.stream,
				gameTitle: payload
			})
			dispatch('notify', { text: '已更新直播主題' })
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	saveGameUrl: async ({ dispatch, state }, payload) => {
		try {
			await firestore.doc('system/stream').set({
				...state.stream,
				gameUrl: payload
			})
			dispatch('notify', { text: '已更新直播主題的連結' })
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	saveGameDescription: async ({ dispatch, state }, payload) => {
		try {
			await firestore.doc('system/stream').set({
				...state.stream,
				gameDescription: payload
			})
			dispatch('notify', { text: '已更新直播主題的簡述' })
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	saveVideoUrl: async ({ dispatch, state }, payload) => {
		try {
			await firestore.doc('system/stream').set({
				...state.stream,
				videoUrl: convertToEmbeded(payload)
			})
			dispatch('notify', { text: '已更新直播影片網址' })
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
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
			function convertToYoutube(id) { return '//www.youtube.com/embed/' + id + '?enablejsapi=1' }
		}
	},
	startStream: async ({ dispatch, state }, payload) => {
		try {
			await firestore.doc('system/stream').set({
				...state.stream,
				time: new Date().toLocaleString().replace(/\//g, '-'),
				streaming: true
			})
			dispatch('submitChat', {
				uid: 'system',
				text: '直播開始囉！大家坐穩啦！',
			})
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
	stopStream: async ({ dispatch, state }, payload) => {
		try {
			await firestore.doc('system/stream').set({
				...state.stream,
				greetings: '今天來跟大家一起玩...',
				streaming: false
			})
		} catch (error) {
			dispatch('notify', { type: 'error', text: error.message })
			throw error
		}
	},
}