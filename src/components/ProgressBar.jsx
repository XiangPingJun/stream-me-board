import '../style/progress-bar.scss'
import { getWindowWidth } from '../misc/common.js'
import React from 'react'
import classNames from 'classnames'

export class ProgressBar extends React.Component {
	state = { inited: false }
	componentDidMount = () => setTimeout(() => this.setState({ inited: true }), 500)
	colors = ['yellow', 'cyan', 'red', 'navy', 'lime']
	getOptionRate = idx => {
		const sum = this.props.optionValue.reduce((a, b) => a + b, 0)
		return sum ? this.props.optionValue[idx] / sum : 1 / this.props.optionValue.length
	}
	render3DBar = (idx, rate, value) => (
		<div key={idx}
			className={`bar ${this.state.inited ? 'bar-100' : 'bar-1'} ${this.colors[idx]} ${this.colors[idx]}-face`}
			style={{ width: getWindowWidth() * 0.75 * rate + 'px', marginRight: 10, transition: 'all 0.3s ease-in-out' }}>
			<div className="face top">
				<div className="growing-bar" style={{ transition: 'all 35s ease-in-out' }}></div>
			</div>
			<div className="face side-0">
				<div className="growing-bar" style={{ transition: 'all 35s ease-in-out' }}></div>
			</div>
			<div className="face floor">
				<div className="growing-bar no-select"
					style={{ color: 'white', whiteSpace: 'nowrap', transition: 'all 35s ease-in-out' }}>
					{value}票
				</div>
			</div>
			<div className="face side-a"></div>
			<div className="face side-b"></div>
			<div className="face side-1">
				<div className="growing-bar" style={{ transition: 'all 35s ease-in-out' }}></div>
			</div>
		</div>
	)
	render2DBar = (idx, rate, value) => (
		<div key={idx}
			className={`bar ${this.state.inited ? 'bar-100' : 'bar-1'} ${this.colors[idx]} ${this.colors[idx]}-face`}
			style={{ width: getWindowWidth() * 0.75 * rate + 'px', marginRight: 10, transition: 'all 0.3s ease-in-out' }}>
			<div className="face top">
				<div className="growing-bar" style={{ color: 'white', whiteSpace: 'nowrap', transition: 'all 35s ease-in-out' }}>
					{value}票
				</div>
			</div>
		</div>
	)
	render = () => (
		<div className={classNames({
			"chart grid": true,
			"use2D": this.props.use2D,
			[this.props.className]: true
		})} style={{ marginTop: this.props.use2D ? 0 : -20, ...this.props.style }}>
			{this.props.optionValue.map((value, idx) =>
				this.props.use2D ?
					this.render2DBar(idx, this.getOptionRate(idx), this.props.optionValue[idx])
					:
					this.render3DBar(idx, this.getOptionRate(idx), this.props.optionValue[idx])
			)}
		</div>
	)
}
export const barColor = ['rgba(241, 196, 15, 0.6)', 'rgba(87, 202, 244, 0.6)', 'rgba(236, 0, 140, 0.6)', 'rgba(10, 64, 105, 0.6)', 'rgba(118, 201, 0, 0.6)']
export const barBgColor = ['rgba(241, 196, 15, 0.2)', 'rgba(87, 202, 244, 0.2)', 'rgba(236, 0, 140, 0.2)', 'rgba(10, 64, 105, 0.2)', 'rgba(118, 201, 0, 0.2)']