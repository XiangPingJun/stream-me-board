import React from 'react'
import { isMobileDevice } from '../misc/common.js'
import { subscribeVote, sendVote, closeModal } from '../actions'
import { connect } from 'react-redux'
import { ProgressBar, barColor, barBgColor } from '../components/ProgressBar.jsx'
import { FlatButton } from '../components/button.jsx'
import '../style/vote.css'
import Rx from "rxjs/Rx"

class Vote extends React.Component {
  constructor(props) {
    super(props)
    const addVote = {}
    for (let i in props.vote.optionVote)
      addVote[i] = 0
    this.state = {
      addVote: addVote
    }
    localStorage.totalVote = 0
    this.addClick = {}
  }
  componentDidMount = () => {
    let sumStream = Rx.Observable.empty()
    for (let i in this.props.vote.optionVote) {
      let clickStream = Rx.Observable.empty()
        .merge(Rx.Observable.fromEvent(this.refs['btn_' + i], 'click').mapTo(1))
        .scan((origin, next) => origin + next, 0)
      clickStream = clickStream.takeUntil(clickStream.delay(2000))
      clickStream.subscribe(value => this.setState({
        addVote: {
          ...this.state.addVote,
          [i]: Math.min(value, 30)
        }
      }))
      sumStream = sumStream.merge(clickStream.takeLast())
    }
    sumStream.take(1).subscribe({
      complete: () => {
        localStorage.lastVote = this.props.vote.start
        this.sendVote()
      }
    })
  }
  sendVote = () => {
    this.props.sendVote(this.state.addVote)
    let totalVote = 0
    for (let i in this.state.addVote)
      totalVote += this.state.addVote[i]
    localStorage.totalVote = totalVote
    this.forceUpdate()
  }
  renderVoteButton = key => ([
    <button key={key} ref={'btn_' + key}
      className="animated bounceInDown vote-button"
      style={{ borderColor: barColor[key], backgroundColor: barBgColor[key] }}>
      {String.fromCharCode('A'.charCodeAt(0) + parseInt(key)) + (this.state.addVote[key] ? `+${this.state.addVote[key]}` : '')}
    </button>,
    <div className="animated bounceInDown"><div className="click-me">↑ 按我</div></div>
  ])
  renderVoteButtonRows = () => {
    if (localStorage.lastVote == this.props.vote.start)
      return null
    const length = Object.keys(this.props.vote.optionVote).length
    let firstRow = [], secondRow = []
    for (let i = 0; i < length; i++)
      if (length > 3 && length / 2 < i)
        secondRow.push(<td>{this.renderVoteButton(i)}</td>)
      else
        firstRow.push(<td>{this.renderVoteButton(i)}</td>)
    if (isMobileDevice())
      return [
        <table style={{ margin: 'auto' }}><tr>{firstRow}</tr></table>,
        <table style={{ margin: 'auto' }}><tr>{secondRow}</tr></table>
      ]
    else
      return <table style={{ margin: 'auto' }}><tr>{[...firstRow, ...secondRow]}</tr></table>
  }
  render = () => (
    <div className='modal'>
      <h1 className="caption animated bounceInDown"
        style={{ animationDelay: '0.2s', fontSize: '5em', margin: 0 }}>投票啦!</h1>
      <h3 className="caption animated bounceInDown"
        style={{ animationDelay: '0.4s', marginBottom: 15, margin: 0, color: '#FFEBEE' }}>
        {localStorage.lastVote != this.props.vote.start ?
          '連點滑鼠! 點幾下就投幾票!' : '你投了' + localStorage.totalVote + '票'}
      </h3>
      <ProgressBar optionValue={this.props.vote.optionVote}
        className="caption animated bounceInDown"
        use2D={this.props.forcePortraitView || isMobileDevice() || this.props.use2D}
        style={{ animationDelay: '0.6s' }} />
      {this.renderVoteButtonRows()}
      <br />
      <FlatButton onClick={this.props.closeModal}
        className="animated bounceInDown"
        style={{ animationDelay: '0.7s' }}
        minText="關閉" icon="close" small={true} />
    </div >
  )
}

export default connect(
  ({vote, forcePortraitView}) => ({
    vote: vote,
    forcePortraitView: forcePortraitView
  }),
  { subscribeVote, sendVote, closeModal }
)(Vote)
