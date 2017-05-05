import React from 'react'
import { FlatButton } from '../components/button.jsx'
import { closeModal } from '../actions'
import { connect } from 'react-redux'

class Notice extends React.Component {
  state = {}
  render = () => (
    <div className='modal' style={{ overflowY: 'auto', width: '100vw', height: '100vh', top: '50%' }}>
      <h1 className='caption animated bounceInDown' style={{ animationDelay: '0.52s' }}>實況通知</h1>
      <h3 className='caption animated bounceInDown' style={{
        marginTop: 15,
        color: 'yellow',
        animationDelay: '0.52s',
      }}>
        <i className='fa fa-bookmark' /> 追蹤LINE官方帳號
      </h3>
      <div className='animated bounceInDown' style={{ animationDelay: '0.54s' }}>
        <div className='caption'>
          搜尋用戶ID『@sgs5099b』追蹤，<br />
          或掃描條碼加入 "新注音新聞"
        </div>
        <img src="line-qr.png" />
      </div>
      <h3 className='caption animated bounceInDown' style={{
        marginTop: 30,
        color: 'yellow',
        animationDelay: '0.56s',
      }}>
        <i className='fa fa-bookmark' /> 追蹤臉書粉絲團
      </h3>
      <div className='animated bounceInDown' style={{ animationDelay: '0.58s' }}>
        <div className='caption'>
          請至 <a href="//www.facebook.com/255223767942122/" target="_blank">新注音新聞粉絲團</a> 按讚追蹤，<br />
          擔心訊息被其他貼文洗掉的朋友可設定搶先看喲！
        </div>
        <a href="//www.facebook.com/255223767942122/" target="_blank"><img src="fb-see-first.png" /></a>
      </div>
      <h3 className='caption animated bounceInDown' style={{
        animationDelay: '0.6s',
        color: 'yellow',
        marginTop: 30
      }}>
        <i className='fa fa-bookmark' /> 追蹤祥平君的噗浪
      </h3>
      <div className='animated bounceInDown' style={{ animationDelay: '0.62s' }}>
        <div className='caption'>
          <a href="//plurk.com/shouhei" target="_blank"><img src="plurk.png" /></a>
        </div>
      </div>
      <h3 className='caption animated bounceInDown' style={{
        animationDelay: '0.64s',
        color: 'yellow',
        marginTop: 30
      }}>
        <i className='fa fa-bookmark' /> 實況影片紀錄
      </h3>
      <div className='animated bounceInDown' style={{ animationDelay: '0.66s' }}>
        <a href="//www.youtube.com/channel/UCLeQT6hvBgnq_-aKKlcgj1Q/videos" target="_blank">
          <img src="youtube.png" />
        </a>
      </div>
      <h3 className='caption animated bounceInDown' style={{
        animationDelay: '0.64s',
        color: 'yellow',
        marginTop: 30
      }}>
        <i className='fa fa-bookmark' /> 切換高畫質影片
      </h3>
      <div className='animated bounceInDown' style={{ animationDelay: '0.68s' }}>
        <div className='caption'>
          按下youtube影片右下角的 <i className="fa fa-cog" /> 即可進行調整
        </div>
      </div>
      <FlatButton onClick={this.props.closeModal}
        className="animated bounceInDown"
        style={{ animationDelay: '1.2s', marginTop: 15, marginBottom: 30 }}
        minText="關閉" icon="close" small={true} />
    </div>
  )
}
export default connect(
  ({ }) => ({}),
  { closeModal }
)(Notice)
