import React from 'react'
import { defaultColors, shuffleArray, getWindowWidth } from '../misc/common.js'
import '../style/color-picker.scss'
import { setMyColor } from '../actions'
import { connect } from 'react-redux'

class ColorPicker extends React.Component {
	constructor(props) {
		super(props)
		let showOrder = shuffleArray([...Array(Object.keys(defaultColors).length).keys()])
		this.colorEnterDelay = {}
		Object.keys(defaultColors).forEach(
			color => this.colorEnterDelay[color] = 0.2 + showOrder.pop() * 0.02 + 's'
		)
		this.state = {
			activeColorChanged: false
		}
	}
	handleColorPick = color => {
		this.setState({
			activeColorChanged: true
		})
		this.props.setMyColor(defaultColors[color])
	}
	renderOption = color => {
		let className = ''
		let style = {
			backgroundColor: defaultColors[color]
		}
		if (this.state.activeColorChanged) {
			if (this.props.myInfo.color == defaultColors[color]) {
				className = 'active-color animated jello'
				style.animationDelay = '0s'
			}
		} else {
			if (this.props.myInfo.color == defaultColors[color]) {
				className = 'active-color'
				style.animationDelay = '0s'
			}
			className += ' animated bounceInDown'
			style.animationDelay = this.colorEnterDelay[color]
		}
		return <li key={color} onClick={() => this.handleColorPick(color)} className={className} style={style} />
	}
	render = () => (
		<ul className="color-picker" style={{ maxWidth: Math.min(getWindowWidth(), 360) }}>
			{Object.keys(defaultColors).map(color => this.renderOption(color))}
		</ul>
	)
}
export default connect(
	({ myInfo }) => ({ myInfo }),
	{ setMyColor }
)(ColorPicker)