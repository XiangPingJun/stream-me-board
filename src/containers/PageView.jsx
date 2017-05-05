import React from 'react'
import LandscapeView from './LandscapeView.jsx'
import PortraitView from './PortraitView.jsx'
import Welcome from './Welcome.jsx'
import { voteTimeout, isMobileDevice, getWindowWidth, getWindowHeight } from '../misc/common.js'
import { subscribeSysInfo, subscribeMyInfo, subscribeVote, showVoteModal, closeModal, subscribeRank } from '../actions'
import { connect } from 'react-redux'
import Backdrop from '../components/Backdrop.jsx'
import StickerPicker from './StickerPicker.jsx'
import Vote from './Vote.jsx'
import MyInfo from './MyInfo.jsx'
import Notice from '../components/Notice.jsx'
import Rank from './Rank.jsx'

class PageView extends React.Component {
  componentWillReceiveProps = newProps => {
    if (this.props.vote.start != newProps.vote.start && this.props.vote.start) {
      this.props.showVoteModal()
      setTimeout(() => {
        if (new Date().getTime() - this.props.vote.start > voteTimeout)
          this.props.closeModal()
      }, voteTimeout + 2000)
    }
  }
  componentDidMount = () => {
    this.props.subscribeSysInfo()
    this.props.subscribeMyInfo()
    this.props.subscribeVote()
    this.props.subscribeRank()
    StickerPicker.preload()
    window.addEventListener('resize', () => this.forceUpdate())
    window.addEventListener("orientationchange", () => this.forceUpdate())
  }
  renderModal = () => {
    switch (this.props.activeModal) {
      case 'SHOW_STICKER_MODAL':
        return [<Backdrop />, <StickerPicker />]
      case 'SHOW_VOTE_MODAL':
        return [<Backdrop />, <Vote />]
      case 'SHOW_MY_INFO_MODAL':
        return [<Backdrop />, <MyInfo />]
      case 'SHOW_NOTICE_MODAL':
        return [<Backdrop />, <Notice />]
      case 'SHOW_RANK_MODAL':
        return [<Backdrop />, <Rank />]
    }
  }
  renderView = () => {
    if (isMobileDevice())
      return <PortraitView />
    else
      return this.props.forcePortraitView ? <PortraitView /> : <LandscapeView />
  }
  render = () => {
    if (null == this.props.myInfo)
      return <Welcome />
    else if (Object.keys(this.props.myInfo).length) {
      return (
        <div>
          {this.renderView()}
          {this.renderModal()}
        </div>
      )
    } else
      return null
  }
}

export default connect(
  ({ myInfo, vote, activeModal, forcePortraitView }) => ({
    myInfo: myInfo,
    vote: vote,
    activeModal: activeModal,
    forcePortraitView: forcePortraitView,
  }),
  { subscribeMyInfo, subscribeVote, showVoteModal, closeModal, subscribeSysInfo, subscribeRank }
)(PageView)