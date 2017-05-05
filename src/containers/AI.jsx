import React from 'react'
import { subscribeChat, submitChat, subscribeSysInfo } from '../actions'
import { connect } from 'react-redux'
import { getAutoChat } from '../misc/autoChat.js'

class AI extends React.Component {
  state = {}
  componentDidMount = () => {
    this.props.subscribeChat()
    this.initTime = new Date().getTime()
  }
  componentWillReceiveProps = newProps => {
    if (new Date().getTime() - this.initTime < 5000)
      return
    const newChatId = Object.keys(newProps.chatMsg)[Object.keys(newProps.chatMsg).length - 1]
    if (newChatId == Object.keys(this.props.chatMsg)[Object.keys(this.props.chatMsg).length - 1])
      return
    const newChat = newProps.chatMsg[newChatId]
    if (newChat.effect || '系統' == newChat.name)
      return
    let autoChatText = getAutoChat(newChat.text, newChat.name)
    if (autoChatText)
      setTimeout(() => this.props.submitChat('系統', autoChatText, 'black', null), 500)
    this.latestChatTime = new Date().getTime()
  }
  render = () => <div />
}

export default connect(
  ({ chatMsg }) => ({
    chatMsg: chatMsg
  }),
  { subscribeChat, submitChat, subscribeSysInfo }
)(AI)
