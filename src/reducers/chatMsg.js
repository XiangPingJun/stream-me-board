import { maxChatCount } from '../misc/common.js'

export default function chat(state = {}, action) {
  switch (action.type) {
    case 'CLEAR_CHAT':
      return {}
    case 'RECEIVE_CHAT':
      return { ...state, ...action.payload.chat }
    default:
      return state
  }
}
