import React from 'react'
import { closeModal } from '../actions'
import { connect } from 'react-redux'
import NameBadge from '../components/NameBadge.jsx'

const TROPHY_TIMEOUT = 3000

class RankTrophy extends React.Component {
	diff = {}
	componentWillReceiveProps = newProps => {
		this.keepDiff(newProps, '聊天王', 'currChatCount')
		this.keepDiff(newProps, '貼圖達人', 'currStickerCount')
		this.keepDiff(newProps, '特效大師', 'currEffectCount')
		this.keepDiff(newProps, '灌票高手', 'currVoteCount')
		this.keepDiff(newProps, '忠實觀眾', 'watchCount')
		setTimeout(() => this.forceUpdate(), TROPHY_TIMEOUT + 100)
	}
	keepDiff = (newProps, title, curr) => {
		try {
			const oldInfo = this.props.rank[curr][0]
			const newInfo = newProps.rank[curr][0]
			if (oldInfo.name == newInfo.name)
				return
			this.diff[curr] = {
				title,
				oldInfo,
				newInfo,
				time: new Date().getTime()
			}
		} catch (e) { }
	}
	render = () => (
		<div style={{ position: 'absolute', bottom: 15, textAlign: 'center', opacity: 0.75, width: '100vw' }}>
			{Object.keys(this.diff).map(k => this.diff[k]).filter(item => new Date().getTime() - item.time < TROPHY_TIMEOUT).map(item =>
				<span className="animated fadeIn" style={{ margin: '0 15px' }}>
					<span className="stroke-text">{item.title}：</span>
					<NameBadge name={item.oldInfo.name} color={item.oldInfo.color} />
					<span className="stroke-text">➔ </span>
					<NameBadge name={item.newInfo.name} color={item.newInfo.color} />
				</span>
			)}
		</div>
	)
}
export default connect(
	({ rank }) => ({
		rank: rank
	}),
	{}
)(RankTrophy)