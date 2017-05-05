import React from 'react'
import { isMobileDevice, setVideoPlayer } from '../misc/common.js'
import '../style/video-box.css'

export default class VideoBox extends React.Component {
	static defaultProps = {
		width: Infinity, height: Infinity,
		onLoad: () => { }
	}
	state = {}
	componentDidMount = () => {
		this.refs.iframe.onload = () => {
			this.setupYoutube()
			this.setState({ loaded: true })
			this.props.onLoad()
		}
	}
	setupYoutube = () => {
		if (!YT || !YT.Player)
			return setTimeout(() => this.setupYoutube(), 200)
		const player = new YT.Player(this.refs.iframe, {
			events: {
				'onReady': () => {
					if (this.props.autoPlay)
						player.playVideo()
					player.setPlaybackQuality(isMobileDevice() ? 'medium' : 'hd720')
				}
			}
		})
		setVideoPlayer(player)
	}
	getVideoSize = () =>
		this.props.height > this.props.width * (9 / 16) ? ({
			width: this.props.width,
			height: this.props.width * (9 / 16),
		}) : ({
			width: this.props.height * (16 / 9),
			height: this.props.height,
		})
	render = () => (
		<div className={this.state.loaded ? this.props.className + ' video-box' : 'visibility-hidden'}
			style={{
				...this.getVideoSize(),
				...this.props.style,
			}}>
			<div className="container">
				<iframe ref="iframe" frameBorder="0" allowFullScreen={true} src={this.props.src} style={this.getVideoSize()} />
			</div>
		</div>
	)
}