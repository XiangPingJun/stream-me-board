import React from 'react'
//import ComicBubble from '../components/ComicBubble.jsx'
import { getWindowWidth } from '../../utils/common.js'
import '../../style/breeze-input.scss'
import Rx from "rxjs/Rx"
import { loginMyInfo } from '../../actions'
import { connect } from 'react-redux'
import Background from '../Background'

class Welcome extends React.Component {
  state = {}
  componentDidMount = () =>
    Rx.Observable.timer(10000).subscribe(() => {
      if (this.state.showTip)
        return
      this.setState({ showTip: true })
      this.refs.userName.focus()
    })
  loginMyInfo = e => {
    e.preventDefault()
    if (this.state.userName.match(/[\.#\$\[\]\/]/))
      alert('暱稱當中不能包含 . # $ [ ] / 符號喲～')
    else if (!localStorage.lolita && ('ice' == this.state.userName.toLowerCase() || '祥平君' == this.state.userName || '系統' == this.state.userName))
      alert('暱稱已被使用！')
    else
      this.props.loginMyInfo(this.state.userName)
    return false
  }
  render = () => (
    <div>
      <div style={{ width: '100vw', textAlign: 'center' }}>
        <h1 className="caption animated bounceInDown"
          style={{
            animationDelay: '1s',
            fontSize: '100px',
          }}>歡迎</h1>
        <div className="animated bounceInDown" style={{
          animationDelay: '1.2s',
          width: '25em', display: 'inline-block'
        }}>
          <form onSubmit={this.loginMyInfo}>
            <input ref="userName" placeholder="哈囉，怎麼稱呼你呢：" className="breeze"
              onChange={e => this.setState({ userName: e.target.value.trim() })}
              onFocus={() => this.setState({ showTip: true })}
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }} maxLength={16} />
          </form>
        </div>
        {/*this.state.showTip ? (
        <ComicBubble direction="right" vdirection="bottom" top="230px" left="calc(50vw - 50px)" className="animated jello">
          打上暱稱之後按下輸入鍵<i className="fa fa-level-down fa-rotate-90" style={{ margin: '0 3px' }} />吧！
        </ComicBubble>
      ) : null*/}
      </div>
    </div>
  )
}

export default connect(
  ({ }) => ({}),
  { loginMyInfo }
)(Welcome)