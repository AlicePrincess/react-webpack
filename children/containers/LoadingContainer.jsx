import React, {PropTypes} from 'react'
import styles from './LoadingContainer.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchLoading} from '../actions/loading'
import loadGif from '../public/images/loading/loadGif.gif'
import {push} from 'redux-router'
import TimerMixin from 'react-timer-mixin'
import {Motion, spring} from 'react-motion'

function isWechat(){
	const ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true
	}else{
		// TODO: REVERT IT !!!!!
		return true
	}
}

const LoadingComponent = React.createClass({
	mixins: [TimerMixin],
	componentDidMount: function(){
		if (this.props.loading.get('complete')) {
			this.props.push('/countdown')
			return
		}

		ga('send', 'pageview', 'loading')
		this.props.fetchLoading()
	},
	componentWillUpdate: function(nextProps, nextState){
		if (nextProps.user && nextProps.loading.get('complete')) {
			this.setTimeout(()=>{
				let random=Math.round(Math.random()*9+1);
				if(random==8){
					this.props.push('/failure')
				}else{
					this.props.push('/countdown')
				}
			}, 1000)
		}
	},
    render: function(){
		if(isWechat()){
			return (
				<div style={{backgroundColor: "#f2f2f2"}}>
					<div className={styles.root}>
						<figure>
							<img className="headimgurl" src={this.props.user && this.props.user.get('avatar')} alt=""/>
							<img className="bg" src={loadGif} alt=""/>
						</figure>
						<Motion defaultStyle={{p:0}} style={{p:spring(this.props.loading.get('accomplish'))}}>
							{interpolatingStyle => <p>监考老师正在赶来的路上...<span>{`${interpolatingStyle.p.toFixed(1)}%`}</span><br/>请藏好你的小抄</p>}
						</Motion>
					</div>
				</div>
			)
		}else{
			return (<p>请用微信打开参与活动！</p>)
		}
    },
})

function mapStateToProps(state) {
    return {
    	loading: state.get('loading'),
    	user: state.get('user'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
		fetchLoading: bindActionCreators(fetchLoading, dispatch),
		push: bindActionCreators(push, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent)
