import React from 'react'
import { ChatBubble } from '../components/ChatMsg.jsx'
import triggerStar from '../misc/star.js'
import triggerBlast from '../misc/blast.js'
import triggerHeart from '../misc/heart.js'
import triggerDirt from '../misc/dirt.js'
import { getWindowWidth, getWindowHeight } from '../misc/common.js'
import { connect } from 'react-redux'
import { subscribeChat, submitChat } from '../actions'
import { getAutoChat, randAutoChat } from '../misc/autoChat.js'

const CHAT_TIMEOUT = 5000

class StreamChat extends React.Component {
  state = {
    chats: []
  }
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

    const placeholder = { ...newProps.chatMsg[newChatId], ...this.genRandomPosition(), shown: new Date().getTime(), chatId: newChatId }
    this.setState({
      chatCandidate: placeholder
    }, this.placeNewChat)
    // remove old chat
    setTimeout(() => this.setState({
      chats: this.state.chats.filter(chat => new Date().getTime() - chat.shown <= CHAT_TIMEOUT)
    }), CHAT_TIMEOUT + 100)
  }
  placeNewChat = () => {
    let placeNewChatIteration = 0
    let bestDistance = -1, bestPosition = null

    const placeNewChatStep = () => {
      placeNewChatIteration++
      const shortest = this.shortestDistance()
      if (shortest > bestDistance) {
        bestDistance = shortest
        bestPosition = { ...this.state.chatCandidate }
      }
      if (placeNewChatIteration < 33) {
        const reset = { left: undefined, top: undefined, right: undefined, bottom: undefined }
        const candidate = { ...this.state.chatCandidate, ...reset, ...this.genRandomPosition() }
        this.setState({
          chatCandidate: candidate
        }, placeNewChatStep)
      } else {
        this.setState({
          chats: this.state.chats.concat([bestPosition])
        }, () => this.triggerEffect(bestPosition))
      }
    }
    placeNewChatStep()
  }
  triggerEffect = chat => {
    const center = this.refs['chat' + chat.chatId].getCenter()
    const box = this.refs['chat' + chat.chatId].getBounding()
    switch (chat.effect) {
      case 'BLAST':
        return setTimeout(() => triggerBlast(center.x, center.y), CHAT_TIMEOUT)
      case 'STAR':
        return triggerStar(center.x, center.y, box.width, box.height)
      case 'HEART':
        return triggerHeart(center.x, center.y, box.width, box.height)
      case 'HELLO':
        return triggerDirt(center.x, center.y)
    }
  }
  shortestDistance = () => {
    let shortest = Infinity
    const candidateCenter = this.refs.chatCandidate.getCenter()
    for (let chat of this.state.chats) {
      const chatCenter = this.refs['chat' + chat.chatId].getCenter()
      const distance = Math.pow(chatCenter.x - candidateCenter.x, 2) + Math.pow(chatCenter.y - candidateCenter.y, 2)
      if (distance < shortest)
        shortest = distance
    }
    return shortest
  }
  genRandomPosition = () => {
    const x = Math.random() * getWindowWidth() / 2
    const y = Math.random() * getWindowHeight() / 2
    switch (Math.floor(Math.random() * 6)) {
      case 0:
        return { left: x, top: 0 }
      case 1:
        return { right: x, top: 0 }
      case 2:
        return { right: 0, top: y }
      case 3:
        return { right: 0, bottom: y }
      /*case 4:
        return { right: x, bottom: 0 }
      case 5:
        return { left: x, bottom: 0 }*/
      case 4:
        return { left: 0, bottom: y }
      case 5:
        return { left: 0, top: y }
    }
  }
  render = () =>
    <div style={{ ...this.props.style }}>
      {this.state.chats.map(chat =>
        <ChatBubble {...chat} key={chat.chatId} ref={'chat' + chat.chatId} />)
      }
      {this.state.chatCandidate ?
        <ChatBubble ref="chatCandidate" {...this.state.chatCandidate} style={{ visibility: 'hidden' }} />
        : null
      }
    </div>
}

export default connect(
  ({ chatMsg }) => ({
    chatMsg: chatMsg,
  }),
  { subscribeChat, submitChat }
)(StreamChat)