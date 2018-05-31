import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import { TOTAL_AVATAR, VOTE_TIMEOUT } from '../common'

Vue.use(Vuex)
const generateRandomAvatar = () => Math.floor(Math.random() * TOTAL_AVATAR)

export default new Vuex.Store({
	state: {
		myUid: null,
		allUsers: {},
		isAdmin: null,
		stream: {},
		systemInfo: null,
		selectedVideoUrl: null,
		uiMode: {},
		anonymousAvatar: generateRandomAvatar(),
		chatLines: [],
		onlineUser: [],
		historyVideo: [],
		fontLoaded: false,
		vote: null,
	},
	getters: {
		allUsers: state => state.allUsers,
		myInfo: state => state.allUsers[state.myUid] || {},
		isAdmin: state => state.isAdmin,
		stream: state => state.stream,
		systemInfo: state => state.systemInfo,
		uiMode: state => state.uiMode,
		randomNextAvatar: (state, getters) => {
			let result = generateRandomAvatar()
			if (null === getters.myInfo)
				return result
			else if (getters.myInfo.avatarList.length == TOTAL_AVATAR)
				return null
			for (; ; result = generateRandomAvatar())
				if (!getters.myInfo.avatarList.find(avatar => avatar == result))
					return result
		},
		videoUrl: state => state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl,
		anonymousAvatar: state => state.anonymousAvatar,
		chatLines: state => state.chatLines,
		onlineUser: state => state.onlineUser,
		historyVideo: state => state.historyVideo,
		fontLoaded: state => state.fontLoaded,
		vote: state => state.vote,
		voting: state => state.vote && state.vote.time && new Date().getTime() - state.vote.time.seconds * 1000 < VOTE_TIMEOUT
	},
	mutations: {
		setStream: (state, payload) => state.stream = payload,
		setSystemInfo: (state, payload) => state.systemInfo = payload,
		setAllUsers: (state, payload) => state.allUsers = payload,
		setMyUid: (state, payload) => state.myUid = payload,
		setUiMode: (state, payload) => {
			state.uiMode = {
				...state.uiMode,
				...payload,
			}
		},
		setChatLines: (state, payload) => state.chatLines = payload,
		setIsAdmin: (state, payload) => state.isAdmin = payload,
		generateAnonymousAvatar: (state, payload) => state.anonymousAvatar = generateRandomAvatar(),
		setOnlineUser: (state, payload) => state.onlineUser = payload,
		setHistoryVideo: (state, payload) => state.historyVideo = payload,
		setSelectedVideoUrl: (state, payload) => state.selectedVideoUrl = payload,
		setFontLoaded: (state, payload) => state.fontLoaded = payload,
		setVote: (state, payload) => state.vote = payload,
	},
	actions: actions
})
