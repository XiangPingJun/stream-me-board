export default function sysInfo(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_SYS_INFO':
      if (localStorage.version && localStorage.version != action.payload.info.version) {
        localStorage.version = action.payload.info.version
        location.reload()
      }
      localStorage.version = action.payload.info.version
      // if (state.streamId && state.streamId != action.payload.info.streamId)
      //   location.reload()
      return action.payload.info
    default:
      return state
  }
}

