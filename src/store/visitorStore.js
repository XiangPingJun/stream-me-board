import Vue from 'vue'
import Vuex from 'vuex'

const MAX_THUMBNAIL_INDEX = 100

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

const generateRandomThumbnail = () => Math.floor(Math.random() * MAX_THUMBNAIL_INDEX)

export default new Vuex.Store({
	state: {
		myInfo: null,
		stream: null,
		systemInfo: null,
		selectedVideoUrl: null,
		sectionVisible: { quiz: true, chat: true },
		notyf: new Notyf({
			confirmIcon: 'fa fa-info-circle',
			alertIcon: 'fa fa-exclamation-triangle',
			warnIcon: 'fa fa-trophy'
		}),
		anonymousThumbnail: generateRandomThumbnail()
	},
	getters: {
		sectionVisible: state => state.sectionVisible,
		myInfo: state => state.myInfo,
		stream: state => state.stream,
		systemInfo: state => state.systemInfo,
		randomNextThumbnail: state => {

			let result = generateRandomThumbnail()

			if (null === state.myInfo)
				return result
			else if (state.myInfo.thumbnailList.length == MAX_THUMBNAIL_INDEX + 1)
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
		setSectionVisible: (state, payload) => {
			state.sectionVisible = {
				...state.sectionVisible,
				...payload,
			}
		},
		generateAnonymousThumbnail: (state, payload) => state.anonymousThumbnail = generateRandomThumbnail()
	},
	actions: {
		trophyMsg: ({ state }, payload) => state.notyf.warn(payload),
		infoMsg: ({ state }, payload) => state.notyf.confirm(payload),
		errMsg: ({ state }, payload) => state.notyf.alert(payload),
		subscribeData: ({ commit }) => {
			firestore.doc("system/stream").onSnapshot(doc => commit('setStream', doc.data()))
			firestore.doc("system/info").onSnapshot(doc => commit('setSystemInfo', doc.data()))
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			firebase.auth().onAuthStateChanged(user => {
				if (user)
					firestore.collection(`user`).where('email', '==', user.email)
						.onSnapshot(snap => {
							commit('setMyInfo', snap.docs[0].data())
							commit('setSectionVisible', { myInfo: true, anonymousInfo: false, login: false })
						})
				else {
					commit('setMyInfo', null)
					commit('setSectionVisible', { myInfo: false, anonymousInfo: true, login: false })
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
						thumbnailList: [getters.randomNextThumbnail],
						thumbnailSelected: getters.randomNextThumbnail,
						email: email,
					})
					await firebase.auth().createUserWithEmailAndPassword(email, pw)
				} catch (error) {
					dispatch('errMsg', error.message)
					throw error
				}
			}
		},
		logout: async ({ dispatch }) => {
			try {
				await firebase.auth().signOut()
			} catch (error) {
				dispatch('errMsg', error.message)
				throw error
			}
		},
		promptLogin: ({ commit, dispatch }) => {
			commit('setSectionVisible', {
				myInfo: false,
				anonymousInfo: false,
				login: true,
			})
			dispatch('infoMsg', '輸入暱稱才能繼續喲！')
		}
	}
})