import React from 'react'
import { voteTimeout } from '../misc/common.js'
import StreamChat from './StreamChat.jsx'
import { subscribeSysInfo, subscribeVote, subscribeRank } from '../actions'
import { connect } from 'react-redux'
import Vote from './Vote.jsx'
import RankTrophy from './RankTrophy.jsx'

class StreamView extends React.Component {
	componentDidMount = () => {
		this.props.subscribeSysInfo()
		this.props.subscribeVote()
		this.props.subscribeRank()
	}
	componentWillReceiveProps = newProps => {
		if (this.props.vote.start != newProps.vote.start)
			setTimeout(() => this.forceUpdate(), voteTimeout + 200)
	}
	render = () => (
		<div>
			<RankTrophy />
			{new Date().getTime() - this.props.vote.start < voteTimeout ? <Vote /> : null}
			<StreamChat style={{ zIndex: 999, position: 'relative', opacity: 0.75 }} />
		</div>
	)
}

export default connect(
	({ vote }) => ({
		vote: vote,
	}),
	{ subscribeVote, subscribeSysInfo, subscribeRank }
)(StreamView)