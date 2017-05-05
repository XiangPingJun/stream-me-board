import React from 'react'
import { stickerList } from '../misc/stickerList.js'
import { shuffleArray } from '../misc/common.js'
import { FlatButton } from '../components/button.jsx'
import { changeChatInput, closeModal } from '../actions'
import { connect } from 'react-redux'

class StickerPicker extends React.Component {
  static preload() {
    for (let i in stickerList)
      new Image().src = '//i.imgur.com/' + stickerList[i] + '.gif'
  }
  constructor(props) {
    super(props)
    // [1, 2, 3...itemCount]
    const showOrder = shuffleArray([...Array(stickerList.length).keys()])
    this.itemStyle = showOrder.map(order => ({ animationDelay: order * 0.01 + 's' }))
  }
  handleAddSticker = i => {
    this.props.changeChatInput(`${this.props.chatInput}[表情${i}]`)
    this.props.closeModal()
  }
  render = () => (
    <div className='modal'>
      <h1 className='caption animated bounceInDown' style={{ width: '90vw', maxWidth: 500 }}>貼個表情</h1>
      {stickerList.map((sticker, i) =>
        <StickerButton filename={sticker} style={this.itemStyle[i]} key={i}
          onClick={() => this.handleAddSticker(i)} />
      )}
      <br />
      <FlatButton onClick={this.props.closeModal}
        className="animated bounceInDown"
        style={{ animationDelay: '0.05s' }}
        minText="關閉" icon="close" small={true} />
    </div>
  )
}
export default connect(
  ({ chatInput }) => ({
    chatInput: chatInput
  }),
  { changeChatInput, closeModal }
)(StickerPicker)

class StickerButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgClass: 'animated bounceInDown',
      imgStyle: {
        ...props.style,
        margin: 5,
        cursor: 'pointer',
        opacity: 0.9,
      }
    }
  }
  render = () => (
    <img src={'//i.imgur.com/' + this.props.filename + '.gif'}
      onMouseOver={this.handleMouseOver}
      onClick={this.props.onClick}
      className={'box-shadow ' + this.state.imgClass}
      style={this.state.imgStyle} />
  )
}