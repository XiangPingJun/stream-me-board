import { combineEpics } from 'redux-observable/lib/combineEpics.js'
import { subscribeSysInfo, startBroadcast, endBroadcast } from './sysInfo'
import { subscribeMyInfo, loginMyInfo, setMyColor, setMyLastWatched } from './myInfo'
import { subscribeChat, submitChat } from './chat'
import { subscribeVote, startVote, sendVote } from './vote'
import { subscribeRank } from './rank'

export default combineEpics(
  subscribeSysInfo,
  subscribeMyInfo,
  loginMyInfo,
  setMyColor,
  setMyLastWatched,
  startBroadcast,
  endBroadcast,
  subscribeChat,
  submitChat,
  subscribeVote,
  startVote,
  sendVote,
  subscribeRank,
)
