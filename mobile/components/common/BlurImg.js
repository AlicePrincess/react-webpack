import React, {PropTypes} from 'react'

export default class MyComponent extends React.Component{
	constructor(props) {
			super(props)
	}
	render(){
		return(
			<img src={this.props.src} className="blur" style={{filter:`blur(${this.props.blurPx}px)`,'WebkitFilter':`blur(${this.props.blurPx}px)`,'MozFilter':`blur(${this.props.blurPx}px)`}}/>
		)
	}
}
