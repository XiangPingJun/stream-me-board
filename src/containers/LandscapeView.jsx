import React from 'react'
import VideoBox from '../components/VideoBox.jsx'
import { getWindowWidth, getWindowHeight } from '../misc/common.js'
import ChatInput from './ChatInput.jsx'
import ChatBox from './ChatBox.jsx'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import '../style/breeze-input.css'

class LandscapeView extends React.Component {
	state = {}
	componentDidMount = () => {
		window.addEventListener('resize', () => this.forceUpdate())
	}
	getInputClass = () => {
		if (this.state.showInput)
			return "animated rubberBand breeze"
		else if (this.state.videoLoaded) {
			setTimeout(() => this.setState({ showInput: true }), 15000)
			return "visibility-hidden breeze"
		}
	}
	getThankImgPosition = (width, height) => {
		if (!this.refs.video)
			return { width: 0, height: 0 }
		let pos = {
			height: this.refs.video.getVideoSize().height - 15,
		}
		pos.width = pos.height * 628 / 712
		pos.top = (height - pos.height) / 2
		pos.left = (width - pos.width) / 2
		return pos
	}
	render = () => (
		<table>
			<tr>
				<td style={{ paddingLeft: 15, paddingTop: 15 }}>
					{this.props.sysInfo.streaming || !this.state.videoLoaded ? null :
						<a title="觀看記錄" href='//www.youtube.com/channel/UCLeQT6hvBgnq_-aKKlcgj1Q' target='_blank'>
							<img src="thank.png" style={{
								position: 'absolute',
								...this.getThankImgPosition(getWindowWidth() - 430, getWindowHeight())
							}} />
						</a>
					}
					{this.props.sysInfo.videoSrc ? (
						<VideoBox ref="video" src={this.props.sysInfo.videoSrc}
							autoPlay={this.props.sysInfo.streaming}
							width={getWindowWidth() - 400} height={getWindowHeight()}
							className={this.props.sysInfo.streaming ? 'animated flipInX' : 'animated hinge'}
							onLoad={() => this.setState({ videoLoaded: true })} />
					) : null}
				</td>
				<td style={{
					verticalAlign: 'top', paddingLeft: '5px', paddingTop: 10, width: 370
				}} colSpan={3}>
					{this.state.videoLoaded ? (
						<div>
							<Menu />
							<ChatBox style={{ width: 370, height: 'calc(100vh - 240px)', paddingLeft: 7, }} />
							<ChatInput />
						</div>
					) : null}
				</td>
			</tr>
		</table>
	)
}

export default connect(
	({sysInfo}) => ({
		sysInfo: sysInfo,
	}), {}
)(LandscapeView)