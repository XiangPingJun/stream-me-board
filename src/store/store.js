import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import { TOTAL_AVATAR } from '../common'

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
		historyVideo: null,
		preLoadedItems: {},
		voteInfo: { ended: true }, voteRoster: [],
		quizInfo: { ended: true }, quizRoster: [], myAnswer: null
	},
	getters: {
		myInfo(state) { return state.allUsers[state.myUid] || {} },
		randomNextAvatar(state, getters) {
			if (!getters.myInfo.name)
				return generateRandomAvatar()
			const candidate = new Array(TOTAL_AVATAR).fill(0).map((item, i) => i).filter(item => getters.myInfo.avatarList.indexOf(item) < 0)
			if (0 == candidate.length)
				return null
			return candidate[Math.floor(Math.random() * candidate.length)]
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
		voteStartTime(state) { return state.voteInfo.time ? state.voteInfo.time.seconds * 1000 : 0 },
		voted(state) { return !!state.voteRoster.find((roster, i) => roster.uids.indexOf(state.myUid) >= 0) },
		quizStartTime(state) { return state.quizInfo.time ? state.quizInfo.time.seconds * 1000 : 0 },
		quizAnswered(state) { return !!state.quizRoster.find((roster, i) => roster.uids.indexOf(state.myUid) >= 0) },
		preLoaded(state) { return Object.entries(state.preLoadedItems).length > 0 && 0 > Object.entries(state.preLoadedItems).findIndex(([i, val]) => false == val) }
	},
	mutations: {
		setStream(state, payload) { state.stream = payload },
		setSystemInfo(state, payload) { state.systemInfo = payload },
		setAllUsers(state, payload) { state.allUsers = payload },
		setMyUid(state, payload) { state.myUid = payload },
		updateUiMode(state, payload) { state.uiMode = { ...state.uiMode, ...payload, } },
		setUiMode(state, payload) { state.uiMode = payload },
		setChatLines(state, payload) { state.chatLines = payload },
		setIsAdmin(state, payload) { state.isAdmin = payload },
		generateAnonymousAvatar(state, payload) { state.anonymousAvatar = generateRandomAvatar() },
		setOnlineUids(state, payload) { state.onlineUids = payload },
		setHistoryVideo(state, payload) { state.historyVideo = [...payload] },
		setSelectedVideoUrl(state, payload) { state.selectedVideoUrl = payload },
		addPreLoadItem(state, payload) { Vue.set(state.preLoadedItems, payload, false) },
		donePreLoadItem(state, payload) { Vue.set(state.preLoadedItems, payload, true) },
		setVoteInfo(state, payload) { state.voteInfo = payload },
		setMyAnswer(state, payload) { state.myAnswer = payload },
		initVoteRoster(state, payload) {
			state.voteRoster = new Array(payload).fill(0).map((item, i) => ({
				option: String.fromCharCode(65 + i),
				uids: [],
				total: 0
			}))
		},
		addVotes(state, payload) {
			if (state.voteInfo.ended)
				return
			payload.votes.forEach((count, i) => {
				if (0 == count || !state.voteRoster[i] || state.voteRoster[i].uids.indexOf(payload.uid) >= 0)
					return
				const roster = { ...state.voteRoster[i] }
				roster.uids = [...roster.uids, payload.uid]
				roster.total += count
				Vue.set(state.voteRoster, i, roster)
			})
		},
		setQuizInfo(state, payload) { state.quizInfo = payload },
		initQuizRoster(state, payload) {
			state.quizRoster = payload.map((item, i) => ({
				option: item,
				uids: [],
			}))
		},
		addAnswer(state, payload) {
			if (state.quizInfo.ended)
				return
			state.quizRoster[payload.answer].uids = [...new Set([...state.quizRoster[payload.answer].uids, payload.uid])]
		},
	},
	actions: actions
})
