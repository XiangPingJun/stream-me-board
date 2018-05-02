import Vue from 'vue'
import Vuex from 'vuex'

const MAX_THUMBNAIL_INDEX = 100

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default new Vuex.Store({
	state: {
		myInfo: null,
		nextThumbnail: Math.floor(Math.random() * MAX_THUMBNAIL_INDEX),
		stream: null,
		systemInfo: null,
		selectedVideoUrl: null,
		sectionVisible: {
			myInfo: true,
			login: false,
			quiz: true,
		},
		notyf: new Notyf({
			confirmIcon: 'fa fa-info-circle',
			alertIcon: 'fa fa-exclamation-triangle',
			warnIcon: 'fa fa-trophy'
		})
	},
	getters: {
		sectionVisible: state => state.sectionVisible,
		myInfo: state => state.myInfo,
		stream: state => state.stream,
		systemInfo: state => state.systemInfo,
		nextThumbnail: state => state.nextThumbnail,
		videoUrl: state => {
			if (!state.stream)
				return null
			return state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl
		},
	},
	mutations: {
		setStream: (state, payload) => state.stream = payload,
		setSystemInfo: (state, payload) => state.systemInfo = payload,
		setMyInfo: (state, payload) => state.myInfo = payload,
		setSectionVisible: (state, payload) => {
			state.sectionVisible = {
				...state.sectionVisible,
				...payload
			}
		}
	},
	actions: {
		trophyMsg: (context, payload) => context.state.notyf.warn(payload),
		infoMsg: (context, payload) => context.state.notyf.confirm(payload),
		errMsg: (context, payload) => context.state.notyf.alert(payload),
		observeUpdates: context => {
			firestore.doc("system/stream").onSnapshot(doc => context.commit('setStream', doc.data()))
			firestore.doc("system/info").onSnapshot(doc => context.commit('setSystemInfo', doc.data()))
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			firebase.auth().onAuthStateChanged(user =>
				firestore.collection(`user`).where('email', '==', user.email)
					.onSnapshot(snap => context.commit('setMyInfo', snap.docs[0].data()))
			)
		},
		login: async (context, payload) => {
			const name = payload
			const email = `${encodeURI(name)}@mail.net`.toLowerCase()
			const pw = 'dummy-password'
			try {
				await firebase.auth().signInWithEmailAndPassword(email, pw)
			} catch (error) {
				if ('auth/user-not-found' == error.code)
					createUser()
				else {
					context.dispatch('errMsg', error.message)
					throw error
				}
			}
			async function createUser() {
				try {
					await firestore.doc(`user/${name}`).set({
						name: name,
						thumbnailList: [context.state.nextThumbnail],
						thumbnailSelected: context.state.nextThumbnail,
						email: email,
					})
					await firebase.auth().createUserWithEmailAndPassword(email, pw)
				} catch (error) {
					context.dispatch('errMsg', error.message)
					throw error
				}
			}
		},
		promptLogin: context => {
			context.commit('setSectionVisible', {
				myInfo: false,
				login: true
			})
			context.dispatch('infoMsg', '輸入暱稱才能繼續喲！')
		}
	}
})