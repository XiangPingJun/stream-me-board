import React from 'react'
import VideoBox from '../components/VideoBox.jsx'
import { getWindowWidth, getWindowHeight } from '../misc/common.js'
import ChatInput from './ChatInput.jsx'
import ChatBox from './ChatBox.jsx'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import '../style/breeze-input.css'

class PortraitView extends React.Component {
	state = {}
	componentDidMount = () => {
		window.addEventListener('resize', () => this.forceUpdate())
		this.oldBodyStyle = document.body.style.overflowY
		document.body.style.overflowY = 'auto'
	}
	componentWillUnmount = () => {
		document.body.style.overflowY = this.oldBodyStyle
	}
	getInputClass = () => {
		if (this.state.showInput)
			return "animated rubberBand breeze"
		else if (this.state.videoLoaded) {
			setTimeout(() => this.setState({ showInput: true }), 15000)
			return "visibility-hidden breeze"
		}
	}
	getWidth = () => Math.min(getWindowWidth(), 600)
	getThankImgPosition = (width, height) => {
		if (!this.refs.video)
			return { width: 0, height: 0 }
		let pos = {
			top: 10,
			height: this.refs.video.getVideoSize().height - 15,
		}
		pos.width = pos.height * 628 / 712
		pos.left = (getWindowWidth() - pos.width) / 2
		return pos
	}
	render = () =>
		<table style={{ marginLeft: (getWindowWidth() - this.getWidth()) / 2, width: this.getWidth() }}>
			<tr>
				<td style={{ paddingLeft: 2, paddingTop: 2 }}>
					{this.props.sysInfo.streaming || !this.state.videoLoaded ? null :
						<a title="觀看記錄" href='//www.youtube.com/channel/UCLeQT6hvBgnq_-aKKlcgj1Q' target='_blank'>
							<img src="thank.png" style={{
								position: 'absolute',
								...this.getThankImgPosition(getWindowWidth() - 430, getWindowHeight())
							}} />
						</a>
					}
					{this.props.sysInfo.videoSrc ?
						<VideoBox ref="video" src={this.props.sysInfo.videoSrc}
							autoPlay={this.props.sysInfo.streaming}
							width={this.getWidth() - 10}
							className={'animated ' + (this.props.sysInfo.streaming ? 'flipInX' : 'hinge')}
							onLoad={() => this.setState({ videoLoaded: true })} />
						: null}
				</td>
			</tr>
			{this.state.videoLoaded ? [
				<tr><td><Menu /></td></tr>,
				<tr><td><ChatInput /></td></tr>,
				<tr><td><ChatBox inverse={true} style={{ width: this.getWidth() }} /></td></tr>
			] : null}
		</table>
}

export default connect(
	({ sysInfo }) => ({
		sysInfo: sysInfo,
	}),
	{}
)(PortraitView)