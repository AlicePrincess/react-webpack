import React, {PropTypes} from 'react'
import DocumentTitle from 'react-document-title'
import styles from './ExaminationContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchQuestions, pickOption, clearTimeProgress, enterSheet, fetchQuestionBG} from '../actions/answer'
import Question from '../components/examination/Question'
import classNames from 'classnames'
import {VelocityComponent, velocityHelpers} from 'velocity-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {push} from 'redux-router'
import {isMobile} from '../utils/utils'
import _ from 'underscore'
import OptionSelected from '../components/examination/OptionSelected'
import SheetContainer from './SheetContainer'
import AcademicReportContainer from './AcademicReportContainer'
import ProgressContainer from './AnswerProgressBarContainer'
import {analytics} from '../utils/ga'

const DURATION = 80000

import arrowPic from '../public/images/examination/arrow.gif'

const optionClickAnimation = velocityHelpers.registerEffect({
	defaultDuration: 150,
    calls:[
        [{
        	translateX: '-50%',
        	scale: 1.2,
        	color: '#d3944f',
        }, 1],
        [{
        	translateX: '-50%',
        	scale: 1,
        }, 1]
    ]
})

const ExaminationComponent = React.createClass({
	propTypes: {
		enterTransition: PropTypes.bool,
		startEnterAnimation: PropTypes.bool,
	},
	getDefaultProps: function(){
		return {
			useGauss: !isMobile.any() || isMobile.iOS()
			// useGauss: false
		}	
	},
	fetchBGColor: function(){
		// query image average color for render BG
		// if (true) {
		// 	_.forEach(this.props.questions, (question)=>{
		// 		!question.bgColor && this.props.fetchQuestionBG(question._id, question.images_url)
		// 	})
		// }
	},
	componentDidMount: function(){
		if (!this.props.questions || this.props.questions.length === 0) {
			this.props.fetchQuestions()
		}
	},
	componentWillReceiveProps: function(newProps){
		if (this.state.currentIndex >= newProps.questions.length && newProps.questions.length > 0) {
			this.answeredAllQuestions()
		}
	},
	getInitialState: function(){
		// restore persist data
		const data = localStorage.getItem('answerProgress')
		let currentIndex = 0
		if (data) {
			currentIndex = JSON.parse(data).keys.length
		}

		return {
			currentIndex,
			transition: false, // set true for triggering animation of fliping old question card
			optionGroup: [currentIndex], // current options render on screen
			enable: true,
			selectedOption: -1,
			rotate: 0,
			leave: false,
		}
	},

	// handlers
	pickOption: function(answerIndex){
		if (this.state.leave) {
			return
		}

		arguments[1].preventDefault()
		if (!this.state.enable) return

		// this.props.playCircle()
		this.props.pickOption(this.state.currentIndex, answerIndex)
		this.setState({
			enable: false,
			selectedOption: answerIndex,
		})
	},
	triggerFlip: function(evt){
		if (this.state.leave) {
			return
		}
		evt.stopPropagation()
		evt.preventDefault()

		// if (!(this.state.rotate%2)) this.props.playFlip()

		this.setState({
			rotate:++this.state.rotate,
		})
	},
	answeredAllQuestions: function(){
		let metric1 = (localStorage.getItem('timeProgress') * DURATION).toFixed(2), //总答题时长
			metric2 = this.props.keys.length //答题数量
		analytics(metric1, metric2)
		localStorage.setItem("allTime", localStorage.getItem('timeProgress') * DURATION / 1000)
		this.props.clearTimeProgress()
		this.props.completeAnswer()
	},

	// renders
	renderAnswers: function(){
		return (
			<div className={styles.answerContainer}>
				<div className={styles.answerGroupContainer}>
				<ReactCSSTransitionGroup
					transitionName="examination-container-transition-group"
					transitionEnterTimeout={600}
					transitionLeaveTimeout={400}
					transitionAppearTimeout={600}
					transitionAppear={true}
				>
				{
					_.map(this.state.optionGroup, (index)=>{
						const question = this.props.questions[index]
						return (
							<div key={index} className={styles.answerGroup}>
								{
									// each option item
									_.map(question.keys, function(a, i){
										const animation = i===this.state.selectedOption?{
											animation: optionClickAnimation,
											complete: ()=>{
												// answered all questions, move to next page
												if(this.state.currentIndex 	=== this.props.questions.length-1){
													this.answeredAllQuestions()
													return
												}
												this.setState({
													optionGroup: [index+1],
													selectedOption: -1,
													transition: true,
												})
											},
											runOnMount: true,
										}:{
											animation: {
												translateX: '-50%',
												scale: 1,
												color: '#000',
											},
											duration: 0,
											runOnMount: true,
										}
										const bgAnimation = i===this.state.selectedOption?{
											animation: {
												backgroundColorAlpha: 1,
											},
											duration: 150,
											runOnMount: true,
										}:null
										return (
												<VelocityComponent {...bgAnimation} key={i}>
													<div className={classNames(styles.answerItem, i+1===question.keys.length?styles.lastAnswerItem:"")}
														onClick={this.pickOption.bind(this, i)}
														onTouchStart={this.pickOption.bind(this, i)}
													>
														<VelocityComponent {...animation}>
															<span>{String.fromCharCode(65+i)+"."}</span>
														</VelocityComponent>
														<VelocityComponent {...animation} complete={()=>{/*remove duplicated callback*/}}>
															<p>{a}</p>
														</VelocityComponent>
														{this.state.selectedOption==i?(<OptionSelected className={styles.canvas} duration={350} index={i} emergency={this.props.emergency}></OptionSelected>):null}
														<div className={styles.underline}></div>
													</div>
												</VelocityComponent>
											)
									}.bind(this))
								}
							</div>
						)
					})
				}
				</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	},
	renderGrayQuestionCard: function(index, transition){
		return <div className={styles.grayQuestionCard} key={index}></div>
	},
	renderQuestionCard: function(index, onFront, transition){
		let animation
		if (onFront&&transition) {
			animation = {
				animation: {
					translateX: '-150%',
					rotateZ: -10,
				},
				runOnMount: true,
				duration: 450,
				delay: 100,
				complete: function(){
					this.setState({
						transition: false,
						enable: true,
						currentIndex: index+1,
						rotate: 0,
					})
					ga('send', 'pageview', 'answer'+(this.state.currentIndex+1))
				}.bind(this),
			}
		}else if (!onFront&&transition) {
			animation = {
				animation: {
					width: '100%',
					top: '0',
					left: '0',
					opacity: [1,0],
				},
				runOnMount: true,
				duration: 300,
				delay: 100,
			}
		}

    	return (
    		<VelocityComponent {...animation} key={index}>
	    		<Question question={_.extend({index: index}, this.props.questions[index])}
	    			onFront={onFront}
	    			transition={transition}
	    			triggerFlip={this.triggerFlip}
	    			rotate={onFront?this.state.rotate:0}
    			>
    			</Question>
			</VelocityComponent>
		)
	},
	renderSheet: function(){
		if (this.props.enterSheet) {
			return <SheetContainer></SheetContainer>
		}else{
			return null
		}
	},
	renderReport: function(){
		if (this.props.enterReport) {
			return <AcademicReportContainer></AcademicReportContainer>
		}else{
			return null
		}
	},
	renderBG: function(){
		return (
			<ReactCSSTransitionGroup
				transitionName="examination-container-bg-transition-group"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={400}
				transitionAppearTimeout={300}
				transitionAppear={true}
			>
				{
					_.map(this.props.questions, (question ,index)=>{
						if (index === this.state.currentIndex && !this.props.emergency) {
							if (this.props.useGauss) {
								return <img key={index} className={styles.bgGauss} src={question.images_url}></img>
							}else{
								return null
							}
						}
					})
				}
			</ReactCSSTransitionGroup>
		)
	},
    render: function(){
    	// load questions unsuccessfully
    	if (this.props.questions.length<=0) {
    		return null
    	}
    	// have completed questions already
    	if (this.props.questions.length <= this.state.currentIndex) {
    		return null
    	}

    	// fade to red when emergency state
    	const constainerAnimation = this.props.emergency?{
    		animation: {
    			backgroundColorAlpha: 0.1,
    		},
    		duration: 333,
    		loop: true,
    		runOnMount: true,
    	}:null
    	const enterAnimation = this.props.startEnterAnimation?{
    		animation: {
    			scale: [1, .85],
    			opacity: [1, 0],
    		},
    		runOnMount: true,
    		duration: 300,
    		delay: 200,
    	}:null
    	const leaveAnimationLift = this.props.enterSheet?{
    		animation: {
    			translateY: '-=50vh',
    			opacity: [0, 1],
    		},
    		runOnMount: true,
    		duration: 300,
    		disply: 'none',
    	}:null
    	const leaveAnimationDive = this.props.enterSheet?{
    		animation: {
    			translateY: '+=50vh',
    			opacity: [0, 1],
    		},
    		runOnMount: true,
    		delay: 200,
    		duration: 300,
    		display: 'none',
    		complete: ()=>{
				this.setState({
					leave: true,
				})
    		},
    	}:null
    	const firstTipQuestion = _.findIndex(this.props.questions, (question)=>{return question.tips!==''})

        return (
            <div style={{zIndex: 1}}>
            	{this.props.enterSheet || this.props.enterReport?null:<ProgressContainer></ProgressContainer>}

	    		<VelocityComponent {...constainerAnimation}>
		        	<div className={classNames(styles.container, (this.props.enterTransition?styles.enterContainer:""))}>
			        	{this.renderBG()}
		        		<VelocityComponent {...enterAnimation} {...leaveAnimationLift}>
			        		<div className={styles.progress} style={this.props.enterTransition?{opacity:0}:null}>{`${this.state.currentIndex<9?0:""}${this.state.currentIndex+1} / ${this.props.questions.length}`}</div>
				        </VelocityComponent>
		        		<VelocityComponent {...enterAnimation} {...leaveAnimationLift}>
			        		<div className={styles.cardContainer} style={this.props.enterTransition?{opacity:0}:null}>
					        	{
					        		_.map(this.props.questions, (question, index)=>{
					        			if (index === this.state.currentIndex) {
					        				// render front card
					        				return this.renderQuestionCard(index, true, this.state.transition)
					        			}else if (index === this.state.currentIndex+1) {
					        				// render back card
					        				return this.renderQuestionCard(index, false, this.state.transition)
					        			}else if (index === (this.state.currentIndex+2)%this.props.questions.length && this.state.currentIndex<this.props.questions.length-1){
					        				// render when next question card is exists
					        				return this.renderGrayQuestionCard(index, this.state.transition)
					        			}
					        		})
					        	}
					        </div>
				        </VelocityComponent>
						{
							this.props.questions[this.state.currentIndex].tips!==''?(firstTipQuestion===this.state.currentIndex)?(
								<VelocityComponent {...enterAnimation} {...leaveAnimationLift}>
									<p className={styles.flipTip} style={{opacity:0}}>
										<img src={arrowPic}/>
										{this.state.rotate%2===0?"点击图片可以翻转查看小提示":"点击提示可以返回查看图片"}
									</p>
								</VelocityComponent>
							):(
								<VelocityComponent {...enterAnimation} {...leaveAnimationLift}>
									<p className={styles.flipTip} style={{opacity:0}}>
										{this.state.rotate%2===0?"点击图片可以翻转查看小提示":"点击提示可以返回查看图片"}
									</p>
								</VelocityComponent>
							):(
								<p className={styles.flipTip} style={{opacity:0}}>
									{this.state.rotate%2===0?"点击图片可以翻转查看小提示":"点击提示可以返回查看图片"}
								</p>
							)
						}

			        	{this.props.startEnterAnimation?(
			        		<VelocityComponent {...leaveAnimationDive}>
				        		{this.renderAnswers()}
					        </VelocityComponent>
		        		):null}

		        		{this.renderSheet()}
		        		{this.renderReport()}
		        	</div>
	        	</VelocityComponent>
            </div>
    	)
    },
})

function mapStateToProps(state) {
    return {
    	questions: state.getIn(['answer', 'questions']) && state.getIn(['answer', 'questions']).toJS(),
    	keys: state.getIn(['answer', 'keys']) && state.getIn(['answer', 'keys']).toJS(),
    	emergency: state.getIn(['answer', 'emergency']),
    	enterSheet: state.getIn(['answer', 'enterSheet']),
    	enterReport: state.getIn(['answer', 'enterReport']),
		user: state.get('user'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuestions: bindActionCreators(fetchQuestions, dispatch),
        push: bindActionCreators(push, dispatch),
        pickOption: bindActionCreators(pickOption, dispatch),
        clearTimeProgress: bindActionCreators(clearTimeProgress, dispatch),
        fetchQuestionBG: bindActionCreators(fetchQuestionBG, dispatch),
        // playCircle: bindActionCreators(playCircle, dispatch),
        // playFlip: bindActionCreators(playFlip, dispatch),
        completeAnswer: bindActionCreators(enterSheet, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationComponent)
