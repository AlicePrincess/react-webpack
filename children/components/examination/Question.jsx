import React, {PropTypes} from 'react'
import styles from './Question.scss'
import {VelocityComponent} from 'velocity-react'
import classNames from 'classnames'
import Illustration from './Illustration.jsx'

const Question = React.createClass({
	propTypes: {
		question: PropTypes.object.isRequired,
		onFront: PropTypes.bool.isRequired,
		transition: PropTypes.bool.isRequired,
		rotate: PropTypes.number.isRequired,
		triggerFlip: PropTypes.func.isRequired,
	},

	hanldeClickRotate: function(evt){
		evt.preventDefault()
		evt.stopPropagation()
		if (this.props.transition || this.props.question.tips === '') return
		this.props.triggerFlip(evt)
	},

	render: function() {
		const {question, onFront, transition, rotate} = this.props

		return (
			<div className={classNames(styles.container, this.props.onFront?"":styles.backContainer)}>
				<div className={styles.flipper} style={{transform: `rotateY(${this.props.rotate*180}deg)`}}>
					{/* question content */}
					<div className={styles.flipFront}
						onClick={this.hanldeClickRotate}
						onTouchStart={this.hanldeClickRotate}
					>
						<div className={styles.illustration}>
							<Illustration src={question.images_url}/>
						</div>
						<div className={styles.questionContent}>
							<p>{question.question}</p>
						</div>
					</div>

					{/* question tips */}
					<div className={styles.flipBack}
						onClick={this.hanldeClickRotate}
						onTouchStart={this.hanldeClickRotate}
					>
						<h1>提示:</h1>
						<p>{question.tips}</p>
					</div>
				</div>
			</div>
		)
	}
})

export default Question