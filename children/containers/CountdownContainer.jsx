import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './CountdownContainer.scss'
import classNames from 'classnames'
import TimerMixin from 'react-timer-mixin'
import {push} from 'redux-router'
import {VelocityComponent} from 'velocity-react'
import ExaminationContainer from './ExaminationContainer'
import _ from 'underscore'
import bgImage from '../public/images/background.png'
import tipBackground from '../public/images/countdown/tipBackground.png'
import {fetchUserInfo} from '../actions/user'

const CountdownComponent = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function(){
    return {
      reachEnd: false,
      completeAnimation: false,
    }
  },
  componentDidMount: function() {
    ga('send', 'pageview', 'countdown')
    this.setInterval(() => {
      if (this.state.time <= 1) {
        this.setState({
          reachEnd: true,
        })
        return
      }
      this.setState({
        time: this.state.time - 1,
      })
    }, 1000)
  },
	getInitialState: function(){
		return {
      time: 3
		}
	},

  render: function(){
    const liftAnimation = {
      animation: {
        translateY: '-=100%',
      },
      runOnMount: true,
      duration: 400,
    }
    const diveAnimation = {
      animation: {
        translateY: '+=110%',
      },
      runOnMount: true,
      duration: 400,
      complete: ()=>{
        this.setState({
          completeAnimation: true,
        })
      }
    }
    const lift = this.state.reachEnd?liftAnimation:null
    const dive = this.state.reachEnd?diveAnimation:null

    return (
        <div className={styles.root} style={{backgroundImage:`url(${bgImage})`, backgroundRepeat: 'repeat-x', backgroundSize: 'auto 100%'}}>
          {!this.state.completeAnimation?(
              <VelocityComponent {...lift}>
                <div className="blackboard">
                  <div className="countdown" style={{opacity:this.state.time==4?0:1}}>{this.state.time}</div>
                  <div className="info">
                    <p>姓名：<font>{this.props.name}</font></p>
                    <p>班级：<font>三年2班</font></p>
                  </div>
                </div>
              </VelocityComponent>
            ):null
          }
          {!this.state.completeAnimation?(
              <VelocityComponent {...dive}>
                <div className="text">
                  <img src={tipBackground}/>
                </div>
              </VelocityComponent>
            ):null
          }

          <ExaminationContainer enterTransition={true} startEnterAnimation={this.state.reachEnd}></ExaminationContainer>
        </div>
    )
  },
})

function mapStateToProps(state) {
  return {
    name: state.getIn(['user', 'nickname']),
    isTransition: _.contains(state.get('route').location.pathname.split('/'), 'transition'),
    user: state.getIn(['user']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch),
    push: bindActionCreators(push, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownComponent)
