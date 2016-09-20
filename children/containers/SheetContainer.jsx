import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './SheetContainer.scss'
import {fetchQuestions, checkAnswers, enterReport} from '../actions/answer'
import {push} from 'redux-router'
import _ from 'underscore'
import TimerMixin from 'react-timer-mixin'
import {VelocityComponent} from 'velocity-react'
import {fetchUserInfo} from '../actions/user'

const SheetComponent = React.createClass({
	mixins: [TimerMixin],
	_checked: false,

	componentDidMount: function(){
		ga('send', 'pageview', 'sheet')
		if (this.props.questions.length<=0) {
			this.props.fetchQuestions()
		}

		if (this.props.questions.length > 0 && !this._checked) {
			this.props.checkAnswers(this.props.questions, this.props.answers, this.props.user)
			this._checked = true
		}
		this.setTimeout(() => {
			this.props.enterReport()
		}, 2500)
	},
	componentWillReceiveProps: function(newProps){
		if (newProps.questions.length>0 && !this._checked) {
			this.props.checkAnswers(newProps.questions, newProps.answers, this.props.user)
			this._checked = true
		}
	},

    render: function(){
		if (this.props.questions.length<=0) {
			return null
		}

		const appearAnimation = {
			animation: {
				opacity: [1, 0],
				scale: [1, 0.8],
				translateX: ['-50%', '-50%'],
				translateY: ['-50%', '-50%'],
			},	
			duration: 200,
			delay: 300,
			runOnMount: true,
		}

		const leaveAnimation = this.props.leave?{
			animation: {
				opacity: [0, 1],
				translateY: ['-50%', '-50%'],
				translateX: ['-50%', '-50%'],
				scale: [1.2, 1],
			},	
			duration: 200,
			runOnMount: true,
			display: 'none',
		}:null

		return (
			<VelocityComponent {...appearAnimation} {...leaveAnimation}>
				<div className={styles.root} style={{opacity: 0}}>
					<figure>
						<figcaption>答题卡</figcaption>
						<p>{`本次考试共计${this.props.questions.length}题，共100分`}</p>
						<p>严禁考生留下任何号码贿赂考官，本校将严格遵循校纪校规，做出公平、公正的评分</p>
					</figure>
					<article className="showSheet">
						{
							_.map(this.props.questions, (question, index)=>{
								let userAnswer = String.fromCharCode(this.props.answers[index]+65) || " "

								return (
									<div key={index} className="answer">
										<div>
											<img src={question.images_url}/>
										</div>

										<span>{index+1}</span>
										<p>{userAnswer}</p>
									</div>
								)
							})
						}
					</article>
					<div>请耐心等待，老师正在阅卷...</div>
				</div>
			</VelocityComponent>
		)
    },
})

function mapStateToProps(state) {
	return {
    	questions: state.getIn(['answer', 'questions'])&&state.getIn(['answer', 'questions']).toJS(),
    	answers: state.getIn(['answer', 'keys'])&&state.getIn(['answer', 'keys']).toJS(),
    	user: state.get('user'),
    	leave: state.getIn(['answer', 'enterReport']),
    }
}

function mapDispatchToProps(dispatch) {
    return {
		fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
		fetchQuestions: bindActionCreators(fetchQuestions, dispatch),
    	checkAnswers: bindActionCreators(checkAnswers, dispatch),
    	enterReport: bindActionCreators(enterReport, dispatch),
    	push: bindActionCreators(push, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SheetComponent)
