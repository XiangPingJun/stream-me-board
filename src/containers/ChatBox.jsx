import React from 'react'
import { connect } from 'react-redux'
import { ChatLine } from '../components/ChatMsg.jsx'
import { subscribeChat } from '../actions'
import NameBadge from '../components/NameBadge.jsx'

class ChatBox extends React.Component {
  componentDidMount = () => this.props.subscribeChat()
  componentWillReceiveProps = newProps => {
    setTimeout(() => {
      const content = this.refs.scrollContent
      if (content)
        content.scrollTop = this.props.inverse ? 0 : content.scrollHeight + 34
    }, 200)
  }
  renderChats = () => {
    let endingMsg = this.props.sysInfo.streaming ? null :
      <div className='animated rubberBand'>
        <NameBadge name='系統' color='black' />
        <span style={{ fontSize: '22px' }}>實況結束囉～各位朋友可以參考 <a href='//www.youtube.com/channel/UCLeQT6hvBgnq_-aKKlcgj1Q' target='_blank'>youtube頻道</a> 或是 <a href='//www.youtube.com/playlist?list=PL6wxwmjQggCJIXMujSg9wSB6OCd5OlyAQ' target='_blank'>實況精華</a> 來觀看紀錄喲！</span>
      </div>
    let chats = Object.keys(this.props.chatMsg).map(key =>
      <ChatLine key={key} {...this.props.chatMsg[key]} style={{ margin: '5px 0' }} fontSize={this.props.fontSize} />
    )
    if (this.props.inverse) {
      chats.reverse()
      return [endingMsg, ...chats]
    } else
      return [...chats, endingMsg]
  }
  render = () => (
    <div style={{
      position: 'relative', float: 'left',
      marginBottom: '10px', overflow: 'hidden',
      ...this.props.style,
    }}>
      <div ref="scrollContent" style={{
        width: this.props.style.width, height: '100%',
        overflowY: 'scroll', overflowX: 'hidden',
        paddingRight: 17,
        overflowWrap: 'break-word', wordBreak: 'break-all',
        color: 'white'
      }}>
        {this.renderChats()}
      </div>
    </div>
  )
}

export default connect(
  ({ chatMsg, sysInfo }) => ({
    chatMsg: chatMsg,
    sysInfo: sysInfo,
  }), { subscribeChat }
)(ChatBox)