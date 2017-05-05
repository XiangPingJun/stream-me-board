export default function chat(state = '', action) {
  switch (action.type) {
    case 'CHANGE_CHAT_INPUT':
      return action.payload.text
    default:
      return state
  }
}
