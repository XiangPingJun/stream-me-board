import Vue from 'vue'
import Vuex from 'vuex'

const TOTAL_THUMBNAIL = 100

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const generateRandomThumbnail = () => Math.floor(Math.random() * TOTAL_THUMBNAIL)

export default new Vuex.Store({
	state: {
		myInfo: null,
		stream: null,
		systemInfo: null,
		selectedVideoUrl: null,
		uiMode: {
			account: null,
			quiz: true,
			chat: true,
		},
		notyf: new Notyf({
			confirmIcon: 'fa fa-info-circle',
			alertIcon: 'fa fa-exclamation-triangle',
			warnIcon: 'fa fa-trophy'
		}),
		anonymousThumbnail: generateRandomThumbnail(),
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
		anonymousThumbnail: state => state.anonymousThumbnail
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
		generateAnonymousThumbnail: (state, payload) => state.anonymousThumbnail = generateRandomThumbnail()
	},
	actions: {
		trophyMsg: ({ state }, payload) => {

			state.notyf.warn(`<div style="font-size:50% !important; margin-bottom:5px;">獲得獎盃</div><div>${payload}</div>`)
		},
		infoMsg: ({ state }, payload) => state.notyf.confirm(payload),
		errMsg: ({ state }, payload) => state.notyf.alert(payload),
		saveMyInfo: ({ state }, payload) => {
			firestore.collection('user').doc(state.myInfo.name).set(payload)
				.catch(error => {
					dispatch('errMsg', error.message)
					throw error
				})
		},
		addExp: ({ state }, payload) => {
			const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
			newMyInfo.exp += payload
			newMyInfo.level = Math.floor(myInfo.exp / 100)
			newMyInfo.exp %= 100
			commit('saveMyInfo', myInfo)
		},
		checkTrophy: ({ state, dispatch, getters }) => {
			if (state.myInfo && state.stream.streaming && !state.myInfo.viewedStream.includes(state.stream.time)) {
				const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
				newMyInfo.level += 1
				newMyInfo.viewedStream.push(state.stream.time)
				newMyInfo.thumbnailList.push(getters.randomNextThumbnail)
				dispatch('saveMyInfo', newMyInfo)
				let msg = state.myInfo.viewedStream.length ? '第一次來看直播！' : '一起來看直播！'
				dispatch('trophyMsg', msg)
			}
		},
		subscribeData: ({ commit, dispatch }) => {
			firestore.doc("system/stream").onSnapshot(doc => {
				commit('setStream', doc.data())
				dispatch('checkTrophy')
			})
			firestore.doc("system/info").onSnapshot(doc => {
				commit('setSystemInfo', doc.data())
				dispatch('checkTrophy')
			})
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					firestore.collection('user').where('email', '==', user.email)
						.onSnapshot(snap => {
							if (!snap.docs[0]) {
								dispatch('errMsg', `${user.email} not found!`)
								return
							}
							commit('setMyInfo', snap.docs[0].data())
							commit('setUiMode', { account: 'MY_INFO' })
							dispatch('checkTrophy')
						})
				} else {
					commit('setMyInfo', null)
					commit('setUiMode', { account: 'ANONYMOUS' })
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
					dispatch('errMsg', error.message)
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
					})
					await firebase.auth().createUserWithEmailAndPassword(email, pw)
				} catch (error) {
					dispatch('errMsg', error.message)
					throw error
				}
			}
		},
		logout: async ({ dispatch, commit }) => {
			try {
				commit('generateAnonymousThumbnail')
				await firebase.auth().signOut()
			} catch (error) {
				dispatch('errMsg', error.message)
				throw error
			}
		},
		promptLogin: ({ commit, dispatch }) => {
			commit('setUiMode', { account: 'LOGIN' })
			dispatch('infoMsg', '輸入暱稱才能繼續喲！')
		},
		promptSelectThumbnail: ({ commit }) => {
			commit('setUiMode', { selectThumbnail: true })
		},
	}
})