import Vue from 'vue'
import Vuex from 'vuex'

const TOTAL_THUMBNAIL = 100

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const generateRandomThumbnail = () => Math.floor(Math.random() * TOTAL_THUMBNAIL)
let unsubscribeMyInfo = () => { }
let unsubscribeChat = () => { }

export default new Vuex.Store({
	state: {
		myInfo: null,
		stream: null,
		systemInfo: null,
		selectedVideoUrl: null,
		uiMode: {
			account: null,
			quiz: true,
		},
		anonymousThumbnail: generateRandomThumbnail(),
		chatLines: [],
	},
	getters: {
		uiMode: state => state.uiMode,
		myInfo: state => state.myInfo,
		stream: state => state.stream,
		systemInfo: state => state.systemInfo,
		totalThumbnail: state => TOTAL_THUMBNAIL,
		randomNextThumbnail: state => {
			let result = generateRandomThumbnail()
			if (null === state.myInfo)
				return result
			else if (state.myInfo.thumbnailList.length == TOTAL_THUMBNAIL)
				return null
			for (; ; result = generateRandomThumbnail())
				if (!state.myInfo.thumbnailList.find(thumbnail => thumbnail == result))
					return result
		},
		videoUrl: state => {
			if (!state.stream)
				return null
			return state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl
		},
		anonymousThumbnail: state => state.anonymousThumbnail,
		chatLines: state => state.chatLines
	},
	mutations: {
		setStream: (state, payload) => state.stream = payload,
		setSystemInfo: (state, payload) => state.systemInfo = payload,
		setMyInfo: (state, payload) => state.myInfo = payload,
		setUiMode: (state, payload) => {
			state.uiMode = {
				...state.uiMode,
				...payload,
			}
		},
		setChatLines: (state, payload) => state.chatLines = payload,
		generateAnonymousThumbnail: (state, payload) => state.anonymousThumbnail = generateRandomThumbnail()
	},
	actions: {
		notify: ({ }, payload) => { },
		saveMyInfo: ({ state, dispatch, commit }, payload) => {
			commit('setMyInfo', payload)
			firestore.collection('user').doc(state.myInfo.name).set(payload)
				.catch(error => {
					dispatch('notify', { type: 'error', text: error.message })
					throw error
				})
		},
		addExp: ({ state, dispatch, getters }, payload) => {
			if (payload > 100)
				dispatch('notify', { type: 'error', text: `unsupport addExp ${payload}` })
			const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
			newMyInfo.exp += payload
			if (newMyInfo.exp >= 100) {
				newMyInfo.level++
				newMyInfo.exp -= 100
				const nextThumbnail = getters.randomNextThumbnail
				newMyInfo.thumbnailList.push(nextThumbnail)
				dispatch('notify', { data: { thumbnail: nextThumbnail }, text: '升級! 獲得新角色!' })
			}
			dispatch('saveMyInfo', newMyInfo)
		},
		checkTrophy: ({ state, dispatch, getters }) => {
			if (!state.myInfo)
				return
			if (state.stream.streaming && !state.myInfo.viewedStream.includes(state.stream.time)) {
				const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
				newMyInfo.viewedStream.push(state.stream.time)
				if (!state.myInfo.trophy.includes('WATCH_FIRST_TIME')) {
					newMyInfo.trophy.push('WATCH_FIRST_TIME')
					notify('第一次來看直播！')
				}
				dispatch('saveMyInfo', newMyInfo)
				dispatch('addExp', 100)
			}
			function notify(msg) {
				dispatch('notify', { data: { symbol: 'trophy' }, text: msg })
			}
		},
		subscribeData: ({ state, commit, dispatch }) => {
			firestore.doc("system/stream").onSnapshot(doc => {
				const stream = doc.data()
				if (!state.stream || state.stream.time != stream.time) {
					unsubscribeChat()
					unsubscribeChat = firestore.collection(`allChat/${stream.time}/chat-line`).onSnapshot(snap => {
						commit('setChatLines', snap.docs.map(doc => doc.data()).reverse())
						commit('setUiMode', { chat: true })
					})
				}
				commit('setStream', stream)
				dispatch('checkTrophy')
			})
			firestore.doc("system/info").onSnapshot(doc => {
				commit('setSystemInfo', doc.data())
				dispatch('checkTrophy')
			})
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			firebase.auth().onAuthStateChanged(async user => {
				try {
					if (user) {
						const docRef = firestore.collection('user').where('email', '==', user.email)

						const snap = await docRef.get()
						commit('setMyInfo', snap.docs[0].data())
						commit('setUiMode', { account: 'MY_INFO' })
						dispatch('checkTrophy')

						unsubscribeMyInfo = docRef.onSnapshot(snap => {
							commit('setMyInfo', snap.docs[0].data())
						})
					} else {
						commit('setMyInfo', null)
						commit('setUiMode', { account: 'ANONYMOUS' })
					}
				} catch (error) {
					dispatch('notify', { type: 'error', text: error.message })
					throw error
				}
			})
		},
		login: async ({ dispatch, getters }, payload) => {
			const name = payload
			const email = `${encodeURI(name)}@mail.net`.toLowerCase()
			const pw = 'dummy-password'
			try {
				await firebase.auth().signInWithEmailAndPassword(email, pw)
			} catch (error) {
				if ('auth/user-not-found' == error.code)
					createUser()
				else {
					dispatch('notify', { type: 'error', text: error.message })
					throw error
				}
			}
			async function createUser() {
				try {
					await firestore.doc(`user/${name}`).set({
						name: name,
						thumbnailList: [getters.anonymousThumbnail],
						thumbnailSelected: getters.anonymousThumbnail,
						level: 1,
						exp: 0,
						email: email,
						viewedStream: [],
						trophy: []
					})
					await firebase.auth().createUserWithEmailAndPassword(email, pw)
				} catch (error) {
					dispatch('notify', { type: 'error', text: error.message })
					throw error
				}
			}
		},
		logout: async ({ dispatch, commit }) => {
			try {
				await firebase.auth().signOut()
				commit('generateAnonymousThumbnail')
				commit('setUiMode', { selectThumbnail: false })
				unsubscribeMyInfo()
			} catch (error) {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
		},
		changeThumbnail: ({ dispatch, commit, state }, payload) => {
			const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
			if (!state.myInfo.thumbnailList.includes(payload))
				return
			newMyInfo.thumbnailSelected = payload
			dispatch('saveMyInfo', newMyInfo)
			commit('setUiMode', { selectThumbnail: false })
		},
		submitChat: async ({ dispatch, commit, state }, payload) => {
			try {
				let index = (parseInt('zzz', 36) - state.chatLines.length).toString(36)
				index += payload.text.substr(0, 10)
				await firestore.collection(`allChat/${state.stream.time}/chat-line`).doc(index).set(payload)
			} catch (error) {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
		},
		promptLogin: ({ commit, dispatch }) => {
			commit('setUiMode', { account: 'LOGIN' })
			dispatch('notify', { type: 'warn', text: '要先輸入暱稱才能繼續喲！', data: { symbol: 'exclamation-triangle' } })
		},
		promptSelectThumbnail: ({ commit }) => {
			commit('setUiMode', { selectThumbnail: true })
		},
	}
})