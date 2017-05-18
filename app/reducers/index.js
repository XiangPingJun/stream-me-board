import { combineReducers } from 'redux'
import sysInfo from './sysInfo'
import myInfo from './myInfo'
import chatMsg from './chatMsg'
import chatInput from './chatInput'
import activeModal from './activeModal.js'
import vote from './vote.js'
import forcePortraitView from './forcePortraitView.js'
import rank from './rank.js'

export default combineReducers({
  sysInfo,
  myInfo,
  chatMsg,
  chatInput,
  activeModal,
  vote,
  forcePortraitView,
  rank,
})
