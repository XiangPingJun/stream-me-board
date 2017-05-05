import React from 'react'
import { voteTimeout } from '../misc/common.js'
import ChatBox from './ChatBox.jsx'
import { subscribeVote, subscribeSysInfo, subscribeRank, subscribeMyInfo } from '../actions'
import { connect } from 'react-redux'
import Vote from './Vote.jsx'
import MicBar from '../components/MicBar.jsx'

class StreamView extends React.Component {
	componentDidMount = () => {
		this.props.subscribeSysInfo()
		this.props.subscribeVote()
		this.props.subscribeRank()
		this.props.subscribeMyInfo()
	}
	componentWillReceiveProps = newProps => {
		if (this.props.vote.start != newProps.vote.start)
			setTimeout(() => this.forceUpdate(), voteTimeout + 200)
	}
	render = () => (
		<div>
			<MicBar />
			<ChatBox style={{ width: '100vw', height: 'calc(100vh - 20px)', fontSize: '50px' }} />
			{new Date().getTime() - this.props.vote.start < voteTimeout ? <Vote use2D={true} /> : null}
		</div>
	)
}

export default connect(
	({ vote }) => ({
		vote: vote,
	}),
	{ subscribeVote, subscribeSysInfo, subscribeRank, subscribeMyInfo }
)(StreamView)