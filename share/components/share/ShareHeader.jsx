import React, {PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import styles from './style/ShareHeader.scss'

const ShareHeader = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<header className={styles.root}>
				<div className="inner">
					<figure>
						<img src={this.props.userAvatar} alt="image is unvailable"/>
						<p><b>{this.props.username}</b><br/>前来自<span>{this.props.locale}</span></p>
					</figure>
				</div>
			</header>
		)
	}
})

ShareHeader.propTypes = {
	username: PropTypes.string,
	datetime: PropTypes.object,
	locale: PropTypes.string,
	userAvatar: PropTypes.string
}

export default ShareHeader
