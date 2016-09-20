import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {push} from 'redux-router'
import TimerMixin from 'react-timer-mixin'
import failureImg1 from '../public/images/failure/failure1.png'
import failureImg2 from '../public/images/failure/failure2.png'
import failureImg3 from '../public/images/failure/failure3.png'
import {fetchUserInfo} from '../actions/user'
import {requestWeChat} from '../actions/weChat'
import InlineSVG from 'svg-inline-react'
import Share from '../components/common/Share'
import styles from './FailureContainer.scss'
import _ from 'underscore'
import {wxChat,wxChatShare} from '../utils/weChat'

let mun=_.sample([{
	img:failureImg1,
	id:1
},{
	img:failureImg2,
	id:2
},{
	img:failureImg3,
	id:3
}])
let info=_.sample([
  {
    title:"颜值太高",
    desc:"你的美惊动了全校师生，老师取消了你的考试资格。"
  },{
    title:"颜值太高",
    desc:"你的美惊动了全校师生，老师取消了你的考试资格。"
  },{
    title:"长得太丑",
    desc:"你丑哭了监考老师，考试资格被取消。"
  },{
		title: "长得太丑",
		desc: "长得丑不是你的错，出来吓人就是你的错了。"
	},{
    title:"走错考场",
    desc:"本考场考试名单中查不到你，请去正确的考场。"
  },{
    title:"走错考场",
    desc:"这位同学，你不是这个考场的吧？"
  },{
    title:"考试迟到",
    desc:"考试已开始半小时，不能参与考试。"
  },{
    title:"考试迟到",
    desc:"这么重要的考试居然迟到？下次再考吧。"
  }])
const FailureComponent = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function() {
        return {
          share: false
        }
    },
    componentDidMount: function() {

        this.props.fetchUserInfo()
        this.props.requestWeChat()
 		ga('send', 'pageview', 'failure')

    },

    handleShowShare: function(evt) {
        evt.stopPropagation()
        evt.preventDefault()

        this.setState({share: true})
    },
    handleShowLoading: function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        this.props.push('/countdown')
    },
    handleTouch: function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        this.setState({share: false})
    },
    render: function() {
      if(this.props.weChatData&&this.props.user){

				let imgUrl=this.props.user.getIn(['avatar']);
				let weChatData=this.props.weChatData;
				let _this=this
        wxChat(weChatData);
						//
				wx.ready(function(){
					wxChatShare(info.title,info.desc,imgUrl,"",_this,false)
				});
      }
         return (
            <div className={styles.root}>
                <img src={mun.img} className={"score"+mun.id}/>
                <img className={"headimgurl"+mun.id} src={this.props.user && this.props.user.getIn(['avatar'])} alt=""/>
                <p>{info.desc.indexOf('，')==-1?info.desc.substr(0, info.desc.indexOf('？'))+'？':info.desc.substr(0, info.desc.indexOf('，'))+'，'}<br/>{info.desc.split('，')[1]||info.desc.split('？')[1]}</p>
                <div className="footBar">
                    <button onClick={this.handleShowLoading} onTouchStart={this.handleShowLoading}>再考一次</button>
                    <button onClick={this.handleShowShare} onTouchStart={this.handleShowShare}>去分享</button>
                </div>

                {this.state.share? <Share handleTouch={this.handleTouch}></Share>: null}
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        user: state.getIn(['user']),
        weChatData:state.getIn(['weChat','data']),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
        requestWeChat:bindActionCreators(requestWeChat, dispatch),

        push: bindActionCreators(push, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FailureComponent)
