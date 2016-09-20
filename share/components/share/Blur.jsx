import React, {PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const Blur = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
				<img className='blur' src={this.props.img} style={{filter:`blur(${this.props.blurPx}px)`,'WebkitFilter':`blur(${this.props.blurPx}px)`,'MozFilter':`blur(${this.props.blurPx}px)`}}/>
		)
	}
})

export default Blur