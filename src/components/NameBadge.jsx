import React from 'react'
import { connect } from 'react-redux'

class NameBadge extends React.Component {
  renderIcon = (category, icon) => {
    if (this.props.rank[category] && this.props.rank[category][0] && this.props.rank[category][0][category]
      && this.props.rank[category][0].name == this.props.name)
      return <i className={'fa fa-' + icon} style={{ marginRight: 3 }} />
  }
  renderSpecial = () => {
    if ('ヽ(寒∀鳴)ﾉ＜觸手教教主です' == this.props.name || '寒鳴' == this.props.name)
      return <i className='fa fa-mars-double' style={{ marginRight: 3 }} />
    if ('Kurumi٩(๑òωó๑)۶' == this.props.name || '可露米ヾ(・-・*)ﾉ' == this.props.name)
      return <i className='fa fa-paint-brush' style={{ marginRight: 3 }} />
    if ('祥平君' == this.props.name)
      return <i className='fa fa-volume-up' style={{ marginRight: 3 }} />
    if ('Ice' == this.props.name)
      return <i className='fa fa-github-alt' style={{ marginRight: 3 }} />
  }
  render = () =>
    <span style={{
      borderRadius: 5, color: 'white', padding: '0 5px', marginRight: 5, fontWeight: 'normal',
      backgroundColor: this.props.color,
    }}>
      {this.renderSpecial()}
      {this.renderIcon('currChatCount', 'wechat')}
      {this.renderIcon('currStickerCount', 'smile-o')}
      {this.renderIcon('currEffectCount', 'flash')}
      {this.renderIcon('currVoteCount', 'shower')}
      {this.renderIcon('watchCount', 'star')}
      {this.props.name}
    </span>
}
export default connect(
  ({ rank }) => ({
    rank: rank
  }),
  {}
)(NameBadge)