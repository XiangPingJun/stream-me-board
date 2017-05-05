import React from 'react'
import { submitChat, changeChatInput, setMyLastWatched } from '../actions'
import { connect } from 'react-redux'

class ChatInput extends React.Component {
  state = {}
  componentDidMount = () => {
    if (this.props.myInfo.lastWatched != this.props.sysInfo.streamId && this.props.sysInfo.streaming) {
      this.props.setMyLastWatched()
      this.sayHello()
    }
  }
  componentWillReceiveProps = newProps => {
    // focus chat for stick picker
    if (newProps.chatInput && this.props.chatInput != newProps.chatInput)
      this.refs.input.focus()
    if (newProps.myInfo.lastWatched != newProps.sysInfo.streamId && this.props.sysInfo.streaming) {
      this.props.setMyLastWatched()
      this.sayHello()
    }
  }
  handleSubmitChat = e => {
    e.preventDefault()
    if (!this.props.chatInput.trim())
      return false
    this.props.submitChat(
      localStorage.userName,
      this.props.chatInput.trim(),
      this.props.myInfo.color,
      null
    )
    this.props.changeChatInput('')
    return false
  }
  sayHello = () => {
    if ('祥平君' == localStorage.userName || 'ice' == localStorage.userName)
      return
    const randomHello = [
      "安安ice 安安祥平 平安喜樂",
      "YO~ice~祥平",
      "ice、祥平我來啦！[表情19]",
      "ㄤㄤice&祥平&大家！",
      "[表情18]哈囉大家～",
      "哈囉ice&祥平",
      "大家空邦挖～ice和祥平空邦挖～",
      "上來看實況喔耶！[表情11]",
      "Hi~~~~ice&祥平",
      "(拉椅子、望向ice和祥平)",
      "(悄悄地登入)"
    ]
    this.props.submitChat(
      localStorage.userName,
      randomHello[Math.floor(Math.random() * randomHello.length)],
      this.props.myInfo.color,
      'HELLO'
    )
  }
  render = () => (
    <form onSubmit={this.handleSubmitChat}>
      <input ref="input" placeholder="說點什麼吧：" className="animated bounceInUp breeze"
        onChange={e => this.props.changeChatInput(e.target.value)} value={this.props.chatInput}
        onKeyDown={this.onInputKeyDown} maxLength={140}
        style={{ fontFamily: "'Noto Sans TC', sans-serif", animationDelay: '0.5s' }} />
    </form>
  )
}

export default connect(
  ({ sysInfo, chatInput, myInfo }) => ({
    sysInfo: sysInfo,
    chatInput: chatInput,
    myInfo: myInfo
  }),
  { submitChat, changeChatInput, setMyLastWatched }
)(ChatInput);