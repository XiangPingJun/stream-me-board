import React from 'react'
import ReactDOM from 'react-dom'
import ComicBubble from '../components/ComicBubble.jsx'
import { stickerList, effectList } from '../misc/stickerList.js'
import NameBadge from './NameBadge.jsx'

export class ChatLine extends React.Component {
  getImgStyle = () => ({ margin: '0 5px', opacity: 0.7, verticalAlign: 'middle' })
  renderChat = () => {
    for (let effect in effectList)
      if (this.props.text == `[${effect}]`)
        return <img src={`//i.imgur.com/${effectList[effect]}.gif`} style={this.getImgStyle()} />
    return this.renderRichText()
  }
  renderRichText = () => {
    if (this.props.text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/))
      return <a href={this.props.text} target="_blank">{this.props.text}</a>
    else
      return this.props.text.split(/(\[表情\d+\])/g).map(text =>
        /\[表情\d+\]/.test(text) ?
          <img src={'//i.imgur.com/' + stickerList[text.match(/(\d+)/)[1]] + '.gif'} style={this.getImgStyle()} />
          : text
      )
  }
  render = () => (
    <div className={this.props.className + ' animated rubberBand'}
      style={{
        fontSize: this.props.fontSize,
        ...this.props.style
      }}>
      <NameBadge name={this.props.name} color={this.props.color} />
      {this.renderChat()}
    </div>
  )
}

export class ChatBubble extends ChatLine {
  getBounding = () => ReactDOM.findDOMNode(this.refs.bubble).getBoundingClientRect()
  getCenter = () => {
    const box = this.getBounding()
    return {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    }
  }
  render = () => (
    <ComicBubble ref="bubble" {...this.props} className={this.props.className + ' animated jello'} style={this.props.style}>
      <NameBadge name={this.props.name} color={this.props.color} />
      {this.renderChat()}
    </ComicBubble>
  )
}