export default function myInfo(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_MY_INFO':
      return action.payload.info
    default:
      return state
  }
}
