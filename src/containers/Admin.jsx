import React from 'react'
import { voteTimeout } from '../misc/common.js'
import { subscribeSysInfo, startBroadcast, endBroadcast, subscribeVote, startVote, submitChat } from '../actions'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

const ADMIN_ACCOUNT = 'admin@admin.com'

class Admin extends React.Component {
  state = {}
  componentDidMount = () => {
    this.props.subscribeSysInfo()
    this.props.subscribeVote()
    firebase.auth().onAuthStateChanged(user => {
      if (!user)
        return
      if (ADMIN_ACCOUNT == user.email)
        this.setState({ isAdmin: true })
    })
  }
  componentWillReceiveProps = newProps =>
    this.setState({
      videoRef: newProps.sysInfo.videoSrc,
      optionCount: newProps.vote && newProps.vote.optionVote ? Object.keys(newProps.vote.optionVote).length : null
    })
  handleStartBroadcast = () => {
    const url = convertToEmbeded(this.state.videoRef)
    this.props.startBroadcast(url)

    function convertToEmbeded(url) {
      let arr = /\/\/youtu.be\/(.*)/.exec(url)
      if (arr)
        return convertToYoutube(arr[1])
      arr = /\/\/www\.youtube\.com\/watch\?v=([^&]+)/.exec(url)
      if (arr)
        return convertToYoutube(arr[1])
      arr = /\/\/www\.youtube\.com\/embed\/([^?]+)/.exec(url)
      if (arr)
        return convertToYoutube(arr[1])
      function convertToYoutube(id) { return '//www.youtube.com/embed/' + id + '?enablejsapi=1' }
    }
  }
  getVoteCount = () =>
    Object.keys(this.props.vote.optionVote).map((prev, curr) =>
      ' ' + String.fromCharCode('A'.charCodeAt(0) + curr) + ':' + this.props.vote.optionVote[curr] + '票 '
    )
  handleStartVote = () => {
    this.props.startVote(this.state.optionCount)
    setTimeout(() => {
      this.props.submitChat('系統', '投票結果：' + this.getVoteCount(), 'black', null)
      this.forceUpdate()
    }, voteTimeout + 500)
  }
  onLogInInputKey = e => {
    if ('Enter' != e.key)
      return
    firebase.auth().signInWithEmailAndPassword(ADMIN_ACCOUNT, this.state.PW)
      .then(() => this.setState({ isAdmin: true }))
      .catch(() => alert('login failed'))
  }
  renderAdmin = () => (
    <div style={{ width: '90%' }}>
      {undefined === this.props.sysInfo.streaming ?
        <h1 style={{ color: '#AAAAAA', margin: 0 }}>載入中...</h1>
        : (this.props.sysInfo.streaming ?
          <h1 style={{ color: '#00838F', margin: 0 }}>直播中</h1>
          :
          <h1 style={{ color: '#AAAAAA', margin: 0 }}>沒有直播</h1>
        )}
      <TextField floatingLabelText="影片網址:" value={this.state.videoRef}
        onFocus={() => this.setState({ videoRef: '' })}
        onBlur={() => this.state.videoRef ? null : this.setState({ videoRef: this.props.sysInfo.videoSrc })}
        onChange={(e) => this.setState({ videoRef: e.target.value })}
        style={{ width: '100%' }} floatingLabelFixed={true} />
      <br />
      <RaisedButton label="發布" primary={true} style={{ marginRight: 15 }}
        onClick={this.handleStartBroadcast}
        icon={<i className="fa fa-gamepad" style={{ color: '#FFF' }} />} />
      <RaisedButton label="離線" secondary={true}
        onClick={this.props.endBroadcast}
        icon={<i className="fa fa-unlink" style={{ color: '#FFF' }} />} />
      <table>
        <tr>
          <td style={{ width: 150 }}><Checkbox label="臉書po了?" /></td>
          <td style={{ width: 150 }}><Checkbox label="噗浪po了?" /></td>
          <td style={{ width: 150 }}><Checkbox label="LINEpo了?" /></td>
        </tr>
      </table>
      {new Date().getTime() - this.props.vote.start < voteTimeout ?
        <h1 style={{ color: '#00838F', margin: 0, marginTop: 5 }}>投票中</h1>
        :
        <h1 style={{ color: '#AAAAAA', margin: 0, marginTop: 5 }}>無投票</h1>
      }
      選項數：
      <DropDownMenu value={this.state.optionCount} onChange={(event, index, value) => this.setState({ optionCount: value })}
        style={{ paddingLeft: 0 }}>
        <MenuItem value={2} primaryText="2個" />
        <MenuItem value={3} primaryText="3個" />
        <MenuItem value={4} primaryText="4個" />
        <MenuItem value={5} primaryText="5個" />
      </DropDownMenu>
      <RaisedButton label="新投票" onClick={this.handleStartVote} primary={true}
        icon={<i className="fa fa-bar-chart" style={{ color: '#FFF' }} />} />
      <br />
      票數：{this.getVoteCount()}
    </div>
  )
  renderLogIn = () => <input type="password" onKeyPress={this.onLogInInputKey} onChange={e => this.setState({ PW: e.target.value })} value={this.state.PW} style={{ height: 20 }} />
  render = () => this.state.isAdmin ? this.renderAdmin() : this.renderLogIn()
}

export default connect(
  ({ sysInfo, vote }) => ({
    sysInfo: sysInfo,
    vote: vote
  }),
  { subscribeSysInfo, startBroadcast, endBroadcast, subscribeVote, startVote, submitChat }
)(Admin)
