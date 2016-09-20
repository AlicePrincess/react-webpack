import React, {PropTypes} from 'react'
import styles from './Illustration.scss'

const Illustration = React.createClass({
	propTypes: {
		src: PropTypes.string.isRequired,
	},
	getInitialState: function(){
		return {
			ratio: 1,
			loaded: false,
		}
	},

	// handlers
	handleImageLoaded: function(evt){
		this.setState({
			ratio: evt.target.width/evt.target.height,
			loaded: true,
		})
	},
	getStyle: function(){
		if (!this.state.loaded) {
			return {
				display: 'none'
			}
		}
		// tall image
		if (this.state.ratio<1.8) {
			return {
				height: '100%',
				width: `${100*this.state.ratio/1.8}%`
			}
		}
		// wide image
		if (this.state.ratio >= 1.8) {
			return {
				width: '100%',
				height: `${180/(this.state.ratio)}%`
			}
		}

	},

	render: function() {
		return (
			<div className={styles.container}>
				<img src={this.props.src} style={this.getStyle()} onLoad={this.handleImageLoaded}/>
			</div>
		)
	}
})

export default Illustration
