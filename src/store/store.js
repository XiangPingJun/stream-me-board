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
		voteInfo: null,
		voteRoster: null,
		voting: false,
	},
	getters: {
		allUsers(state) { return state.allUsers },
		myInfo(state) { return state.allUsers[state.myUid] || {} },
		isAdmin(state) { return state.isAdmin },
		stream(state) { return state.stream },
		systemInfo(state) { return state.systemInfo },
		uiMode(state) { return state.uiMode },
		randomNextAvatar(state, getters) {
			let result = generateRandomAvatar()
			if (null === getters.myInfo)
				return result
			else if (getters.myInfo.avatarList.length == TOTAL_AVATAR)
				return null
			for (; ; result = generateRandomAvatar())
				if (!getters.myInfo.avatarList.find(avatar => avatar == result))
					return result
		},
		videoUrl(state) { return state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl },
		anonymousAvatar(state) { return state.anonymousAvatar },
		chatLines(state) { return state.chatLines },
		onlineUser(state) { return state.onlineUser },
		historyVideo(state) { return state.historyVideo },
		fontLoaded(state) { return state.fontLoaded },
		voteRoster(state) { return state.voteRoster },
		voteStatTime(state) { return (!state.voteInfo || !state.voteInfo.time) ? 0 : state.voteInfo.time.seconds * 1000 },
	},
	mutations: {
		setStream(state, payload) { state.stream = payload },
		setSystemInfo(state, payload) { state.systemInfo = payload },
		setAllUsers(state, payload) { state.allUsers = payload },
		setMyUid(state, payload) { state.myUid = payload },
		updateUiMode(state, payload) { state.uiMode = { ...state.uiMode, ...payload, } },
		setChatLines(state, payload) { state.chatLines = payload },
		setIsAdmin(state, payload) { state.isAdmin = payload },
		generateAnonymousAvatar(state, payload) { state.anonymousAvatar = generateRandomAvatar() },
		setOnlineUser(state, payload) { state.onlineUser = payload },
		setHistoryVideo(state, payload) { state.historyVideo = payload },
		setSelectedVideoUrl(state, payload) { state.selectedVideoUrl = payload },
		setFontLoaded(state, payload) { state.fontLoaded = payload },
		setVoteInfo(state, payload) {
			state.voteInfo = payload
			state.voteRoster = Array.apply(null, new Array(payload.optionCount)).map((item, i) => ({
				option: String.fromCharCode(65 + i),
				users: [],
				total: 0
			}))
		},
		updateVoting(state, payload) {
			if (!state.voteInfo || !state.voteInfo.time)
				return false
			state.voting = new Date().getTime() - state.voteInfo.time.seconds * 1000 < VOTE_TIMEOUT
		},
		updateVoteRoster(state, payload) {
			for (const i in payload) {
				state.voteRoster[i].users = payload[i].users
				state.voteRoster[i].total = payload[i].total
			}
		},
	},
	actions: actions
})
