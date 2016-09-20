import React from 'react'
import {fetchUserInfo} from '../actions/user'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {parse} from '../utils/utils'
import bgImage from '../public/images/background.png'
import {requestWeChat} from '../actions/weChat'
import {wxChat,wxChatShare} from '../utils/weChat'
import styles from './AppContainer.scss'
import _ from 'underscore'
import DocumentTitle from 'react-document-title'

const info = _.sample([{
	title: "颜值太高",
	desc: "你的美惊动了全校师生，老师取消了你的考试资格。"
}, {
	title: "颜值太高",
	desc: "长得居然比校长还帅？你已被赶出了考场。"
}, {
	title: "长得太丑",
	desc: "你丑哭了监考老师，考试资格被取消。"
}, {
	title: "长得太丑",
	desc: "长得丑不是你的错，出来吓人就是你的错了。"
},{
	title: "走错考场",
	desc: "本考场考试名单中查不到你，请去正确的考场。"
}, {
	title: "走错考场",
	desc: "这位同学，你不是这个考场的吧？"
}, {
	title: "考试迟到",
	desc: "考试已开始半小时，不能参与考试。"
}, {
	title: "考试迟到",
	desc: "这么重要的考试居然迟到？下次再考吧。"
}])

const AppComponent = React.createClass({
	componentWillMount: function(){
		this.props.fetchUserInfo(parse("token"))
		this.props.requestWeChat()
	},
	componentWillUpdate: function(nextProps, nextState) {
		if (this.props.weChatData && this.props.user) {
			let imgUrl = this.props.user.getIn(['avatar']);
			let weChatData = this.props.weChatData;
			let _this=this
			wxChat(weChatData);
			wx.ready(function() {
				wxChatShare(info.title, info.desc, imgUrl, "",_this,false)
			});
		}
	},
	render: function() {
		return (
			<DocumentTitle title="回到童年，你能得几分？">
			<div style={{backgroundImage:`url(${bgImage})`, backgroundRepeat: 'repeat-x', backgroundSize: 'auto 100%'}}>
				{this.props.children}
				<p className={styles.version}>粤ICP备15101790号  Version.52</p>
			</div>
		</DocumentTitle>
		)
	}
})

function mapStateToProps(state) {
    return {
    	route: state.get('route'),
    	user: state.get('user'),
		weChatData:state.getIn(['weChat','data']),
    }
}

function mapDispatchToProps(dispatch) {
    return {
    	fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
		requestWeChat:bindActionCreators(requestWeChat, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
