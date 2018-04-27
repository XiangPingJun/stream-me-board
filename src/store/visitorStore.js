import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default new Vuex.Store({
	state: {
		myInfo: null,
		topDialogType: 'MY_INFO',
		mainDialogType: 'QUIZ',
		stream: null,
		systemInfo: null,
		selectedVideoUrl: null,
	},
	getters: {
		myInfo: state => state.myInfo,
		topDialogType: state => state.topDialogType,
		mainDialogType: state => state.mainDialogType,
		stream: state => state.stream,
		systemInfo: state => state.systemInfo,
		videoUrl: state => {
			if (!state.stream)
				return null
			return state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl
		},
	},
	mutations: {
		showLoginDialog: state => state.topDialogType = 'LOGIN',
		setStream: (state, payload) => state.stream = payload,
		setSystemInfo: (state, payload) => state.systemInfo = payload,
	},
	actions: {
		getUpdates: context => {
			firestore.doc("system/stream").onSnapshot(doc => context.commit('setStream', doc.data()))
			firestore.doc("system/info").onSnapshot(doc => context.commit('setSystemInfo', doc.data()))
		},
		login: (context, payload) => {
			const email = `${encodeURI(payload)}@mail.net`, pw = 'dummy-password'
			firebase.auth().signInWithEmailAndPassword(email, pw).then(
				() => {
					// success
				}, error => 'auth/user-not-found' == error.code ? createUser(email, pw) : error => new Notyf().alert(error.message)
			)
			function createUser(email, pw) {
				firebase.auth().createUserWithEmailAndPassword(email, pw).then(
					getMyInfoUpdates,
					error => new Notyf().alert(error.message)
				)
			}
		}
	}
})