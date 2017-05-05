import React from 'react'
import { FlatButton } from '../components/button.jsx'
import { closeModal } from '../actions'
import { connect } from 'react-redux'
import NameBadge from '../components/NameBadge.jsx'

class Rank extends React.Component {
	renderRankSection = (title, icon, curr, total, unit, animationDelay) => {
		const userInfo = this.props.rank[curr].filter(item => item[curr])
		if (!userInfo.length)
			return null
		return [
			<h2 className='caption animated bounceInDown' style={{ animationDelay: animationDelay + 's', marginTop: 20 }}>
				<span className={"fa fa-" + icon} /> {title}
			</h2>,
			userInfo.slice(0, 3).map((item, i) => {
				let caption = curr != total ? `本次${item[curr]}${unit}，` : ''
				caption += `總計${item[total]}${unit}`
				return (
					<div className='animated bounceInDown' style={{ animationDelay: animationDelay + 's', marginBottom: 5 }}>
						<NameBadge name={item.name} color={item.color} />
						<span className='caption'>{caption}</span>
					</div>
				)
			})
		]
	}
	render = () => (
		<div className='modal' style={{ overflowY: 'auto', width: '100vw', height: '100vh', top: '50%' }}>
			<h1 className='caption animated bounceInDown'>排行榜</h1>
			{this.renderRankSection('聊天王', 'wechat', 'currChatCount', 'totalChatCount', '字', 0.1)}
			{this.renderRankSection('貼圖達人', 'smile-o', 'currStickerCount', 'totalStickerCount', '張', 0.2)}
			{this.renderRankSection('特效大師', 'flash', 'currEffectCount', 'totalEffectCount', '次', 0.3)}
			{this.renderRankSection('灌票高手', 'shower', 'currVoteCount', 'totalVoteCount', '票', 0.4)}
			{this.renderRankSection('忠實觀眾', 'star', 'watchCount', 'watchCount', '次共襄盛舉', 0.5)}
			<br />
			<FlatButton onClick={this.props.closeModal}
				className="animated bounceInDown" style={{ animationDelay: '0.6s' }}
				minText="關閉" icon="close" small={true} />
		</div>
	)
}
export default connect(
	({ rank }) => ({
		rank: rank
	}),
	{ closeModal }
)(Rank)