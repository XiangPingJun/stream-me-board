import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default new Vuex.Store({
	state: {
		myInfo: null,
		mainDialogType: 'QUIZ',
		stream: null,
		systemInfo: null,
		selectedVideoUrl: null,
	},
	getters: {
		myInfo: state => state.myInfo,
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
		showLoginDialog: state => state.mainDialogType = 'LOGIN',
		setStream: (state, payload) => state.stream = payload,
		setSystemInfo: (state, payload) => state.systemInfo = payload,
	},
	actions: {
		getRealtimeUpdates: context => {
			firestore.doc("system/stream").onSnapshot(doc => context.commit('setStream', doc.data()))
			firestore.doc("system/info").onSnapshot(doc => context.commit('setSystemInfo', doc.data()))
		}
	}
})