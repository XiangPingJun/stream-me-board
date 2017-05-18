export default function activeModal(state = {}, action) {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return {}
    case 'SHOW_STICKER_MODAL':
    case 'SHOW_VOTE_MODAL':
    case 'SHOW_MY_INFO_MODAL':
    case 'SHOW_NOTICE_MODAL':
    case 'SHOW_RANK_MODAL':
      return action.type
    default:
      return state
  }
}
