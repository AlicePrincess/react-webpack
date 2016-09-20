import React, {PropTypes} from 'react'
import styles from './OtherGradesContainer.scss'
import InlineSVG from 'svg-inline-react'
import {connect} from 'react-redux'

import {bindActionCreators} from 'redux'
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
import other from '../public/images/other.png'
import _ from 'underscore'
const score=[
	score0,score1,score2,score3,score4,score5,score6,score7,score8,score9,score10,score11,score12
]
const GRADE_CURVE = [3, 6, 9, 12]
import {otherAnswers} from '../actions/answer'
const WATER_MARK = [
  "/grade0.jpg",
  "/grade1.jpg",
  "/grade2.jpg",
  "/grade3.jpg",
]

const OtherGradesComponent = React.createClass({
  handleShowLoading: function(evt) {
      evt.stopPropagation()
      evt.preventDefault()
			window.location.href='https://api.childhood.tusoapp.com/index/gateway'

  },
  componentDidMount: function() {
		ga('send', 'pageview', 'friend')
    if (this.getQueryString("id")) {
      this.props.otherAnswers(this.getQueryString("id"))
    }
  },
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  mapToLevel(count) {
    return _.sortedIndex(GRADE_CURVE, count)
  },
    render: function(){
			  if (!this.props.otherAnswer) {
        return null
      }
    	return (
			<div className={styles.root}>
		<figure>
      	<InlineSVG src={score[this.props.otherAnswer.rightCount]} className="score"></InlineSVG>
      <figcaption>{this.props.otherAnswer.nickname}的成绩单</figcaption>
      <div className="header">
        <img className="headerImg"   src={`${this.props.otherAnswer.avatar}${WATER_MARK[this.mapToLevel(this.props.otherAnswer.rightCount)]}`}/>
      </div>
      <div className="info">
        <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{this.props.otherAnswer.nickname}</p>
        <p>准考证号：{this.getQueryString("admissionId")}</p>
      </div>
      <div className="comments">
        <p>老师评语：</p>
        <p>{this.props.otherAnswer.comment}</p>
      </div>

		</figure>
    <button onClick={this.handleShowLoading}>我也要玩</button>
    <img className="other" src={other}/>
			</div>
		)
    },
})

function mapStateToProps(state) {
    return {
   otherAnswer: state.getIn(['answer', 'otherAnswers']) && state.getIn(['answer', 'otherAnswers']).toJS(),
    }
}

function mapDispatchToProps(dispatch) {
    return {
      otherAnswers:bindActionCreators(otherAnswers, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OtherGradesComponent)
