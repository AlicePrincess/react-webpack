import React, {PropTypes} from 'react'
import DocumentTitle from 'react-document-title'
import styles from './AcademicReportContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import classNames from 'classnames'
import _ from 'underscore'
import QRCode from '../public/images/academicreport/QRCode.png'
import InlineSVG from 'svg-inline-react'
import TimerMixin from 'react-timer-mixin'
import {completeExamination} from '../actions/answer'
import {VelocityComponent} from 'velocity-react'
import score0 from '../public/images/academicreport/score_0.svg'
import score1 from '../public/images/academicreport/score_1.svg'
import score2 from '../public/images/academicreport/score_2.svg'
import score3 from '../public/images/academicreport/score_3.svg'
import score4 from '../public/images/academicreport/score_4.svg'
import score5 from '../public/images/academicreport/score_5.svg'
import score6 from '../public/images/academicreport/score_6.svg'
import score7 from '../public/images/academicreport/score_7.svg'
import score8 from '../public/images/academicreport/score_8.svg'
import score9 from '../public/images/academicreport/score_9.svg'
import score10 from '../public/images/academicreport/score_10.svg'
import score11 from '../public/images/academicreport/score_11.svg'
import score12 from '../public/images/academicreport/score_12.svg'
const score=[
	score0,score1,score2,score3,score4,score5,score6,score7,score8,score9,score10,score11,score12
]

import {push} from 'redux-router'
const GRADE_CURVE = [3, 6, 9, 12]


import base64 from 'base-64'


import {wxChat,wxChatShare} from '../utils/weChat'
import Share from '../components/common/Share'
const WATER_MARK = [
	"/grade0.jpg",
	"/grade1.jpg",
	"/grade2.jpg",
	"/grade3.jpg",
]

const AcademicReportComponent = React.createClass({
	mixins: [TimerMixin],
	componentDidMount: function(){
		ga('send', 'pageview', 'report')
		window.onresize = this.resize()

        localStorage.removeItem('answerProgress')


				if (this.props.weChatData && this.props.user) {

					let imgUrl = this.props.user.getIn(['avatar']);
					let weChatData = this.props.weChatData;
					let desc = _.sample(["这个游戏有毒", "苍老师都来这个游戏了", "简直侮辱我的智商", "小岳岳都答哭了"]);
					let title = "在这场小学考试中，我得了" + this.props.achievement.score + "分！满满的套路！";
					let linkUrl = "?id=" + this.props.achievement.id + "&admissionId=" + _.reduce(this.props.userInfo.get('token').slice(0, 4), (memo, num) => {
						return memo + num.charCodeAt(0)
					}, "TUSO") + "#/other";
					if (95 < this.props.achievement.score) {
						title = "你居然只用了" + localStorage.getItem('allTime') + "秒答对了所有的小学题目！";

					}else if (79< this.props.achievement.score) {
						title ="这些鬼畜的小学题我居然得了"+this.props.achievement.score+"分，我不信朋友圈有比我高的！";
					}else if (59 < this.props.achievement.score) {
						title= _.sample([
							"在这场小学考试中，我得了"+this.props.achievement.score+"分！满满的套路！",
							"小学考试我拿了"+this.props.achievement.score+"分！妈妈说，满分奖励我吃辣条",
							"我得了"+this.props.achievement.score+"分！这些小学题想拿优秀太难了！",
							"我不信！小学考试我才"+this.props.achievement.score+"分？！太侮辱我的智商了！",
							"我得了"+this.props.achievement.score+"分！被小学题虐得不要不要的！"
						])
					}else if (30 < this.props.achievement.score) {
						title= _.sample([
							"卧槽，我居然在小学考试中得了"+this.props.achievement.score+"分？我要炸学校！",
							"我的天，监考老师是我爸爸，我居然还没及格。童年白过了！",
							"这场考试我得了"+this.props.achievement.score+"分！校长说要开除我！",
							"小学考试我才"+this.props.achievement.score+"分？！看来要回去重读小学了",
							"在这场小雪考试中我居然"+this.props.achievement.score+"分！我想静静"
						]);
					}else if (1 < this.props.achievement.score) {
						title =" 再考一次"+this.props.achievement.score+"分，我就要留级了！";
					}else if (0 == this.props.achievement.score) {
						title = "小学题我居然拿"+this.props.achievement.score+"分，回去要跪洗衣板了！";

					} else if (this.props.achievement.interestingQues) {
						// title = this.props.achievement.interestingTitle;
						title = this.props.achievement.interestingQues;
						imgUrl = this.props.achievement.interestingUrl;
					} else if (this.props.achievement.teacherName) {
						title = this.props.achievement.comment;
					imgUrl = this.props.achievement.avatar;
					}


					let _this=this
					wxChat(weChatData);
					wx.ready(function() {
						wxChatShare(title, desc, imgUrl, linkUrl,_this)

					})
				}

		this.setInterval(() => {
			if (this.state.rotate === 1 && !this.state.dirty) {
				this.setState({
					rotate: this.state.rotate + 1
				})
			}
		}, 3000)
	},
	componentWillUpdate: function(nextProps, nextState) {

		if (this.props.weChatData && this.props.user) {

			let imgUrl = this.props.user.getIn(['avatar']);
			let weChatData = this.props.weChatData;
			let desc = _.sample(["这个游戏有毒", "苍老师都来这个游戏了", "简直侮辱我的智商", "小岳岳都答哭了"]);
			let title = "在这场小学考试中，我得了" + this.props.achievement.score + "分！满满的套路！";
			let linkUrl = "?id=" + this.props.achievement.id + "&admissionId=" + _.reduce(this.props.userInfo.get('token').slice(0, 4), (memo, num) => {
				return memo + num.charCodeAt(0)
			}, "TUSO") + "#/other";
			if (95 < this.props.achievement.score) {
				title = "你居然只用了" + localStorage.getItem('allTime') + "秒答对了所有的小学题目！";
			}else if (79< this.props.achievement.score) {
				title ="这些鬼畜的小学题我居然得了"+this.props.achievement.score+"分，我不信朋友圈有比我高的！";
			}else if (59 < this.props.achievement.score) {
				title= _.sample([
					"在这场小学考试中，我得了"+this.props.achievement.score+"分！满满的套路！",
					"小学考试我拿了"+this.props.achievement.score+"分！妈妈说，满分奖励我吃辣条",
					"我得了"+this.props.achievement.score+"分！这些小学题想拿优秀太难了！",
					"我不信！小学考试我才"+this.props.achievement.score+"分？！太侮辱我的智商了！",
					"我得了"+this.props.achievement.score+"分！被小学题虐得不要不要的！"
				])
			}else if (30 < this.props.achievement.score) {
				title= _.sample([
					"卧槽，我居然在小学考试中得了"+this.props.achievement.score+"分？我要炸学校！",
					"我的天，监考老师是我爸爸，我居然还没及格。童年白过了！",
					"这场考试我得了"+this.props.achievement.score+"分！校长说要开除我！",
					"小学考试我才"+this.props.achievement.score+"分？！看来要回去重读小学了",
					"在这场小雪考试中我居然"+this.props.achievement.score+"分！我想静静"
				]);
			}else if (1 < this.props.achievement.score) {
				title =" 再考一次"+this.props.achievement.score+"分，我就要留级了！";
			}else if (0 == this.props.achievement.score) {
				title = "小学题我居然拿"+this.props.achievement.score+"分，回去要跪洗衣板了！";
			} else if (this.props.achievement.interestingQues) {
				// title = this.props.achievement.interestingTitle;
				title = this.props.achievement.interestingQues;
				imgUrl = this.props.achievement.interestingUrl;
			} else if (this.props.achievement.teacherName) {
				title = this.props.achievement.comment;
			imgUrl = this.props.achievement.avatar;
			}

			let _this=this;
			wxChat(weChatData);
			wx.ready(function() {
				wxChatShare(title, desc, imgUrl, linkUrl,_this,true)
			})
		}
	},
	resize(){
		this.render()
	},
	mapToLevel(count){
		return _.sortedIndex(GRADE_CURVE, count)
	},
	getInitialState:function(){
		return{
			rotate:1,
			share:false,
			dirty: false,
			view:false
		}
	},

	// handlers
	handleFilp(e){
		e.preventDefault()
		e.stopPropagation()
		this.setState({
			rotate:++this.state.rotate
		})
	},
	handleViewAvatarToggle(e){
		e.preventDefault()
		e.stopPropagation()
		// avoid auto flip
		this.setState({
			view: !this.state.view,
		})

	},
	handleViewAvatarTouch(e){
		e.preventDefault()
		e.stopPropagation()
	},
	// renders
	renderReport: function(){
		return (
			<div className={styles.report}>
				<div className={styles.header}>成绩单</div>
				<div className={styles.info}>
					{/*avatar*/}
					<div className={styles.avatar}>
						<img src={`${this.props.userInfo.get('avatarSource')}${WATER_MARK[this.mapToLevel(this.props.achievement.rightCount)]}`} onClick={this.handleViewAvatarToggle} onTouchStart={this.handleViewAvatarToggle}/>
					</div>
					{/*user info*/}
					<div className={styles.textInfo}>
						<div className={styles.name}>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{this.props.userInfo.get('nickname')}</div>
						<div className={styles.certificateID}>准考证号：{_.reduce(this.props.userInfo.get('token').slice(0,4), (memo, num)=>{
							return memo + num.charCodeAt(0)
						}, "TUSO")}</div>
					</div>
				</div>
				{/*answers*/}
				<div className={styles.answer}>
					{
						_.map(this.props.achievement.keys, (answer, index)=>{
							return <div key={index} className={styles.answerItem}><code>{index+1}</code>{String.fromCharCode(answer+65) || " "}</div>
						})
					}
				</div>
				<InlineSVG src={score[this.props.achievement.rightCount]} className="score"></InlineSVG>
			</div>
		)
	},
	renderComment: function(){

		const comment = {
			teacherName: this.props.achievement.teacherName,
			avatar: this.props.achievement.avatar,
			comment: this.props.achievement.comment,
		}


		return (
			<div className={styles.comment}>
				<div className={styles.header}>{this.props.achievement.teacherName}评语</div>
				<div className={styles.info}>
					{/*avatar*/}
					<div className={styles.avatar}>
						<img src={this.props.achievement.avatar}/>
					</div>
					{/*user info*/}
					<div className={styles.reportComment}>
						{this.props.achievement.comment}
					</div>
				</div>
			</div>
		)
	},
	renderCong: function(style){
		return (
			<div className={styles.cong} {...style}>
				<p>您已参加抽奖</p>
				<p>关注查看抽奖结果<span>↑</span></p>
			</div>
		)
	},
	renderButton: function(style){
		return (
			<div className={styles.buttonGroup} {...style}>
				<button className={styles.retry} onClick={this.handleCompleteExamination} onTouchStart={this.handleCompleteExamination}>再考一次</button>
				<button className={styles.flaunt} onClick={this.handleShowShare} onTouchStart={this.handleShowShare}>不考了</button>
			</div>
		)
	},
	handleShowShare:function(evt){
		evt.stopPropagation()
		evt.preventDefault()
		this.setState({
			share:true
		})
	},
	handleCompleteExamination:function(evt){
		evt.stopPropagation()
		evt.preventDefault()
		this.props.completeExamination()
		this.props.push('/')
	},
	handleTouch:function(evt){
		evt.stopPropagation()
		evt.preventDefault()
		this.setState({
			share:false
		})
	},
	getQueryString:function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
    render: function(){
		if (!this.props.achievement) return null

    	const appearAnimation0 = {
    		animation: {
    			translateY: [0, 90],
    			opacity: [1, 0],
    		},
    		delay: 400,
    		duration: 300,
    		runOnMount: true,
    	}
    	const appearAnimation1 = {
    		animation: {
    			translateY: [0, 90],
    			opacity: [1, 0],
    		},
    		delay: 450,
    		duration: 300,
    		runOnMount: true,
    	}
    	const appearAnimation2 = {
    		animation: {
    			translateY: [0, 90],
    			opacity: [1, 0],
    		},
    		delay: 500,
    		duration: 300,
    		runOnMount: true,
    	}
    	const initialHide = {
    		style: {
	    		opacity: 0
    		}
    	}

    	return (
			<div className={styles.container}>
				<div className="wrapper">
					<VelocityComponent {...appearAnimation0}>
						<div className="flip-container" onClick={this.handleFilp} onTouchStart={this.handleFilp} {...initialHide}>
							<div className="flipper" style={{transform: "rotateY("+this.state.rotate*180+"deg)"}}>
								<div className="front">
									{this.renderReport()}
								</div>
								<div className="back">
									{this.renderComment()}
								</div>
							</div>
							<div className={styles.clickTip}>点击卡片{this.state.rotate%2?"查看完整评语":"返回成绩单"}</div>
						</div>
					</VelocityComponent>

					<VelocityComponent {...appearAnimation2}>
						{this.renderButton(initialHide)}
					</VelocityComponent>


					<VelocityComponent {...appearAnimation1}>
						<div className={styles.QRCode} {...initialHide}>
							<img src={QRCode}/>
							<VelocityComponent {...appearAnimation1}>
								{this.renderCong(initialHide)}
							</VelocityComponent>
						</div>
					</VelocityComponent>
				</div>

				{this.state.share?<Share handleTouch={this.handleTouch}></Share>:null}
				{this.state.view?(<div className={styles.viewAvatar} onClick={this.handleViewAvatarToggle} onTouchStart={this.handleViewAvatarToggle}>
					<img src={`${this.props.userInfo.get('avatarSource')}${WATER_MARK[this.mapToLevel(this.props.achievement.rightCount)]}`} onTouchStart={this.handleViewAvatarTouch}/>
				</div>):null}
			</div>
		)
    },
})

function mapStateToProps(state) {
    return {
		user: state.getIn(['user']),
    	achievement: state.getIn(['answer', 'achivement']) && state.getIn(['answer', 'achivement']).toJS(),
		userInfo: state.getIn(['user']),
		weChatData:state.getIn(['weChat','data']),
    }
}


function mapDispatchToProps(dispatch) {
    return {
		push: bindActionCreators(push, dispatch),
		completeExamination: bindActionCreators(completeExamination, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcademicReportComponent)
