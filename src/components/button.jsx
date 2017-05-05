import '../style/button.css'
import React from 'react'
import classNames from 'classnames'

export class FlatButton extends React.Component {
  render = () => (
    <button onClick={this.props.onClick}
      className={classNames({
        'flat-button': true,
        'small': this.props.small,
        [this.props.className]: this.props.className
      })}
      style={this.props.style}>
      {this.props.icon ? <i className={"fa fa-" + this.props.icon} /> : null}
      <span> {this.props.small ? this.props.minText : this.props.text}</span>
    </button>
  )
}

export class IconButton extends React.Component {
  static defaultProps = {
    onClick: () => { }
  }
  render = () => (
    <div onClick={this.props.onClick}
      className={this.props.className + " icon-button disabled"} style={{...this.props.style, float: 'left', }}>
      <div style={{ textAlign: 'center' }}><i className={"fa fa-lg fa-" + this.props.icon} /></div>
      <div className="text">{this.props.text}</div>
    </div >
  )
}