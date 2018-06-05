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
		onlineUids: [],
		historyVideo: [],
		fontLoaded: false,
		voteInfo: null,
		voteRoster: null,
		voting: false,
	},
	getters: {
		myInfo(state) { return state.allUsers[state.myUid] || {} },
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
		onlineUsers(state) {
			return state.onlineUids.map(uid => {
				const arr = uid.split(' ')
				if (1 == arr.length)
					return state.allUsers[uid]
				else
					return { avatarSelected: arr[1] }
			})
		},
		videoUrl(state) { return state.stream.streaming ? state.stream.videoUrl : state.selectedVideoUrl },
		voteStatTime(state) { return (!state.voteInfo || !state.voteInfo.time) ? 0 : state.voteInfo.time.seconds * 1000 },
		voted(state) { return state.voteRoster.find((roster, i) => roster.users.find(user => user.uid == state.myUid)) }
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
		setOnlineUids(state, payload) { state.onlineUids = payload },
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
