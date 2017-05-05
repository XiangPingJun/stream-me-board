import React from 'react'
import classNames from 'classnames'
import '../style/comic-bubble.css'

export default class ComicBubble extends React.Component {
  render = () => (
    <div
      className={classNames({
        'cbbl': true,
        'cbbl--right': undefined !== this.props.left,
        'cbbl--up': undefined !== this.props.top,
        [this.props.className]: this.props.className
      })}
      style={{
        position: 'fixed',
        top: this.props.top, bottom: this.props.bottom,
        left: this.props.left, right: this.props.right,
        ...this.props.style
      }}>
      {this.props.children}
    </div>
  )
}