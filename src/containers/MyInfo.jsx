import React from 'react'
import { stickerList } from '../misc/stickerList.js'
import { shuffleArray } from '../misc/common.js'
import { FlatButton } from '../components/button.jsx'
import ColorPicker from './ColorPicker.jsx'
import { closeModal } from '../actions'
import { connect } from 'react-redux'

class MyInfo extends React.Component {
  render = () => (
    <div className='modal'>
      <h1 className='caption animated bounceInDown'
        style={{ width: '90vw' }}>{localStorage.userName}</h1>
      <div className='caption animated bounceInDown'
        style={{ animationDelay: '0.2s' }}>更換暱稱顏色：</div>
      <ColorPicker />
      <div className='caption animated bounceInDown' style={{ animationDelay: '0.3s' }}>
        聊天<span className='fa fa-wechat' style={{ margin: '0 3px' }} />共{this.props.myInfo.totalChatCount}字
        <br />
        貼圖<span className='fa fa-smile-o' style={{ margin: '0 3px' }} />共{this.props.myInfo.totalStickerCount}張
        <br />
        特效<span className='fa fa-flash' style={{ margin: '0 3px' }} />共{this.props.myInfo.totalEffectCount}次
        <br />
        投票<span className='fa fa-shower' style={{ margin: '0 3px' }} />共{this.props.myInfo.totalVoteCount}票
        <br />
        共襄盛舉<span className='fa fa-star' style={{ margin: '0 3px' }} />{this.props.myInfo.watchCount}次
      </div>
      <br />
      <FlatButton onClick={this.props.closeModal}
        className="animated bounceInDown"
        style={{ animationDelay: '0.4s' }}
        minText="關閉" icon="close" small={true} />
    </div>
  )
}
export default connect(
  ({ myInfo }) => ({
    myInfo: myInfo
  }),
  { closeModal }
)(MyInfo)