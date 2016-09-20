import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styles from './AnswerProgressBarContainer.scss'
import classNames from 'classnames'
import {VelocityComponent} from 'velocity-react'
import {emergency, recordProgress, clearTimeProgress, enterSheet} from '../actions/answer'
import {push} from 'redux-router'
import {analytics} from '../utils/ga'
import _ from 'underscore'

const DURATION = 80000

class ProgressContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initialProgress: 0,
        }
        ga('send', 'pageview', 'answer1')
    }

    componentWillMount(){
        // restore from persist storage
        let progress
        if (progress=localStorage.getItem('timeProgress')) {
            this.setState({
                initialProgress: JSON.parse(progress)
            })
        }
    }

    render() {
        // configuration of progress bar animation
        const progressBarAnimation = {
            animation: {
                width: `100%`,
            },
            duration: (1-this.state.initialProgress)*DURATION,
            progress: function(){
                let signaled = false
                let lastRecord = this.state.initialProgress
                return (e, complete)=>{
                    complete = this.state.initialProgress + (1-this.state.initialProgress)*complete
                    if (complete - lastRecord > 0.02) {
                        lastRecord = complete
                        this.props.recordProgress(lastRecord)
                    }

                    if (complete>0.9375 && !signaled) {
                        signaled = true
                        this.props.emergency()
                    }
                }
            }.bind(this)(),
            complete: function(){
                let metric1 = DURATION, //总答题时长
                    metric2 = this.props.keys.length //答题数量
                analytics(metric1, metric2)
                this.props.clearTimeProgress()
                this.props.enterSheet()
            }.bind(this),
            runOnMount: true,
        }
        const progressColorAnimation = {
            animation: {
                backgroundColor: ['#f26c4f', '#35b353'],
            },
            delay: Math.max(DURATION*(1-this.state.initialProgress)-10000, 0),
            duration: 5000,
            runOnMount: true,
        }

        return (
            <VelocityComponent {...progressBarAnimation}>
                <div className={styles.progressBar} style={_.extend({width: `${this.state.initialProgress*100}%`}, this.props.leave?{display:'none'}:{})}>
                    <VelocityComponent {...progressColorAnimation}>
                        <div></div>
                    </VelocityComponent>
                </div>
            </VelocityComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        leave: state.getIn(['answer', 'enterSheet']),
        keys: state.getIn(['answer', 'keys']) && state.getIn(['answer', 'keys']).toJS(),
        user: state.get('user'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        emergency: bindActionCreators(emergency, dispatch),
        push: bindActionCreators(push, dispatch),
        recordProgress: bindActionCreators(recordProgress, dispatch),
        clearTimeProgress: bindActionCreators(clearTimeProgress, dispatch),
        enterSheet: bindActionCreators(enterSheet, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressContainer)
