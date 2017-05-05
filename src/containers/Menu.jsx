import React from 'react'
import { IconButton, FlatButton } from '../components/Button.jsx'
import { shuffleArray, isMobileDevice, getWindowHeight, } from '../misc/common.js'
import { showStickerModal, submitChat, showMyInfoModal, showNoticeModal, toggleView, showRankModal } from '../actions'
import { connect } from 'react-redux'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.itemStyle = []
    //排行榜
    // [1, 2, 3...itemCount]
    const showOrder = shuffleArray(this.renderButtons().map((i, k) => k))
    this.itemStyle = showOrder.map(order => ({ animationDelay: order * 0.02 + 0.5 + 's' }))
  }
  renderButtons = () => {
    let buttons = [
      { icon: 'smile-o', text: '貼個表情', minText: '表情', onClick: this.props.showStickerModal },
      { icon: 'star-o', text: '灑星星', minText: '星星', onClick: () => this.handleSubmitEffect('STAR') },
      { icon: 'heartbeat', text: '灑愛心', minText: '愛心', onClick: () => this.handleSubmitEffect('HEART') },
      { icon: 'bomb', text: '太怒啦', minText: '爆怒', onClick: () => this.handleSubmitEffect('BLAST') },
      { icon: 'child', text: '我的資料', minText: '帳號', onClick: this.props.showMyInfoModal },
      { icon: 'trophy', text: '排行榜', minText: '排行', onClick: () => this.props.showRankModal() },
      { icon: 'rss-square', text: '實況通知', minText: '通知', onClick: this.props.showNoticeModal },
    ]
    if (!isMobileDevice()) {
      if (this.props.forcePortraitView)
        buttons.push({ icon: 'desktop', minText: '橫頁', onClick: this.props.toggleView })
      else
        buttons.push({ icon: 'mobile', text: '直式頁面', onClick: this.props.toggleView })
    }
    buttons.push({ icon: 'sign-out', text: '登出頁面', minText: '登出', onClick: this.handleLogout })
    return buttons.map((param, idx) => (
      (isMobileDevice() || this.props.forcePortraitView) ?
        <FlatButton {...param} style={{ ...this.itemStyle[idx], marginTop: 5 }} small={true} />
        :
        <IconButton {...param} style={this.itemStyle[idx]} />
    ))
  }
  handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('userColor')
    location.reload()
  }
  handleSubmitEffect = effect => {
    if (new Date() - this.lastEffect < 5000)
      return
    this.lastEffect = new Date()
    this.props.submitChat(localStorage.userName, `[${effect}]`, this.props.myInfo.color, effect)
  }
  render = () => (
    <div>{this.renderButtons()}</div>
  )
}

class Button extends React.Component {
  componentDidMount = () => window.addEventListener('resize', () => this.forceUpdate())
  render = () => (
    isMobileDevice() ?
      <FlatButton {...this.props} style={{ ...this.props.style, marginTop: 5 }} small={true} />
      :
      <IconButton {...this.props} />
  )
}

export default connect(
  ({ sysInfo, myInfo, forcePortraitView }) => ({
    sysInfo: sysInfo,
    myInfo: myInfo,
    forcePortraitView: forcePortraitView,
  }),
  { showStickerModal, submitChat, showMyInfoModal, showNoticeModal, toggleView, showRankModal }
)(Menu)