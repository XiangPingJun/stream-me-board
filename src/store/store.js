import Vue from 'vue'
import Vuex from 'vuex'

const TOTAL_THUMBNAIL = 100

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const generateRandomAvatar = () => Math.floor(Math.random() * TOTAL_THUMBNAIL) + 1
let unsubscribeMyInfo = () => { }
let unsubscribeChat = () => { }

export default new Vuex.Store({
	state: {
		myInfo: null,
		isAdmin: null,
		stream: {},
		systemInfo: null,
		selectedVideoUrl: null,
		uiMode: {
			account: null,
			quiz: null,
			playground: null,
		},
		anonymousAvatar: generateRandomAvatar(),
		chatLines: [],
		youtubePlayer: null,
		fingerprint: null,
		onlineUser: []
	},
	getters: {
		uiMode: state => state.uiMode,
		myInfo: state => state.myInfo,
		isAdmin: state => state.isAdmin,
		stream: state => state.stream,
		systemInfo: state => state.systemInfo,
		totalAvatar: state => TOTAL_THUMBNAIL,
		randomNextAvatar: state => {
			let result = generateRandomAvatar()
			if (null === state.myInfo)
				return result
			else if (state.myInfo.avatarList.length == TOTAL_THUMBNAIL)
				return null
			for (; ; result = generateRandomAvatar())
				if (!state.myInfo.avatarList.find(avatar => avatar == result))
					return result
		},
		videoUrl: state => state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl,
		videoTime: state => {
			try {
				const time = state.youtubePlayer.getCurrentTime()
				return Math.floor(time / 3600) + ':' + Math.floor(time % 3600 / 60) + ':' + Math.floor(time % 3600 % 60)
			} catch (error) {
				return -1
			}
		},
		anonymousAvatar: state => state.anonymousAvatar,
		chatLines: state => state.chatLines,
		fingerprint: state => state.fingerprint,
		onlineUser: state => state.onlineUser,
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
		setIsAdmin: (state, payload) => state.isAdmin = payload,
		setYoutubePlayer: (state, payload) => state.youtubePlayer = payload,
		generateAnonymousAvatar: (state, payload) => state.anonymousAvatar = generateRandomAvatar(),
		setFingerprint: (state, payload) => state.fingerprint = payload,
		setOnlineUser: (state, payload) => state.onlineUser = payload,
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
			dispatch('touchUser')
		},
		addExp: ({ state, dispatch, getters }, payload) => {
			if (payload > 100)
				dispatch('notify', { type: 'error', text: `unsupport addExp ${payload}` })
			const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
			newMyInfo.exp += payload
			if (newMyInfo.exp >= 100) {
				newMyInfo.level++
				newMyInfo.exp -= 100
				const nextAvatar = getters.randomNextAvatar
				if (null === nextAvatar) {
					dispatch('notify', { text: '升滿了?! 你真的有認真在看實況嗎?' })
				} else {
					newMyInfo.avatarList.push(nextAvatar)
					dispatch('notify', { data: { avatar: nextAvatar }, text: '升級! 獲得新角色!' })
				}
			}
			dispatch('saveMyInfo', newMyInfo)
		},
		checkTrophy: ({ state, dispatch }) => {
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
		subscribeAdminData: ({ state, commit }) => {
			// remove outdated online user
			firestore.collection('onlineUser').onSnapshot(snap => {
				snap.docs.forEach(doc => {
					if (!doc.data().touched)
						return
					if (new Date().getTime() - doc.data().touched.seconds * 1000 > 120000)
						doc.ref.delete()
				})
				commit('setUiMode', { playground: true })
			})
		},
		touchUser: ({ getters }) => {
			if (getters.myInfo)
				firestore.collection('onlineUser').doc(getters.myInfo.name).set({
					...getters.myInfo,
					touched: firebase.firestore.FieldValue.serverTimestamp()
				})
			else
				firestore.collection('onlineUser').doc(getters.fingerprint).set({
					avatarSelected: getters.anonymousAvatar,
					touched: firebase.firestore.FieldValue.serverTimestamp()
				})
		},
		subscribeData: ({ state, commit, dispatch, getters }) => {
			// Is me banned?
			new Fingerprint2().get(result => commit('setFingerprint', result))
			firestore.doc('system/ban').onSnapshot(doc => {
				if (doc.data().fingerprint.find(hash => hash == getters.fingerprint)) {
					dispatch('logout')
					dispatch('notify', { type: 'error', text: 'You got banned!' })
				}
			})
			// online user
			setInterval(() => dispatch('touchUser'), 60000)
			firestore.collection('onlineUser').onSnapshot(snap => {
				commit('setOnlineUser', snap.docs.map(doc => doc.data()))
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
			firestore.doc("system/info").onSnapshot(doc => {
				commit('setSystemInfo', doc.data())
				dispatch('checkTrophy')
			})
			// my login info
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
						commit('setMyInfo', null)
						commit('setUiMode', { account: 'ANONYMOUS' })
					}
				} catch (error) {
					dispatch('notify', { type: 'error', text: error.message })
					throw error
				}
			})
		},
		loginAdmin: async ({ dispatch }, payload) => {
			try {
				const email = `${encodeURI(payload.name)}@mail.net`.toLowerCase()
				await firebase.auth().signInWithEmailAndPassword(email, payload.password)
			} catch (error) {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
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
				else if ('auth/wrong-password' == error.code) {
					dispatch('notify', { type: 'error', text: '暱稱已被使用!' })
					dispatch('promptLogin')
				} else {
					dispatch('notify', { type: 'error', text: error.message })
					throw error
				}
			}
			async function createUser() {
				try {
					await firestore.doc(`user/${name}`).set({
						name: name,
						avatarList: [getters.anonymousAvatar],
						avatarSelected: getters.anonymousAvatar,
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
				commit('generateAnonymousAvatar')
				commit('setUiMode', { selectAvatar: false })
				unsubscribeMyInfo()
			} catch (error) {
				dispatch('notify', { type: 'error', text: error.message })
				throw error
			}
		},
		changeAvatar: ({ dispatch, commit, state }, payload) => {
			const newMyInfo = JSON.parse(JSON.stringify(state.myInfo))
			if (!state.myInfo.avatarList.includes(payload))
				return
			newMyInfo.avatarSelected = payload
			dispatch('saveMyInfo', newMyInfo)
			commit('setUiMode', { selectAvatar: false })
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
		promptSelectAvatar: ({ commit }) => {
			commit('setUiMode', { selectAvatar: true })
		},
		startStream: async ({ state, dispatch }, payload) => {
			try {
				console.log(payload)
				await firestore.doc('system/stream').set({
					time: new Date().getTime(),
					videoUrl: convertToEmbeded(payload.videoUrl),
					greetings: payload.greetings,
					streaming: true
				})
				dispatch('submitChat', {
					name: '系統',
					avatar: -1,
					text: '實況開始囉！大家坐穩啦！',
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
})

//fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBCYPReX74lujmX9tg8AiM-OFGqmKYMZkU&channelId=UCLeQT6hvBgnq_-aKKlcgj1Q&part=snippet,id&order=date&maxResults=50').then(res => console.log(res))

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