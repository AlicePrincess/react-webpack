import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import InlineSVG from 'svg-inline-react'
import Component from '../../components/Component'
import logo from '../assets/logo.svg'
import styles from './AppContainer.scss'
import styles1 from './AppContainer.less'
import bg from '../assets/bg.jpg'


const AppContainer = React.createClass({
	render: function() {
		return (
				<DocumentTitle title="默认页面">
					<div style={{background:'#f00'}}>
						<div className={styles.root}>
							<h1>默认页面1233</h1>
							<i className="iconfont icon-left"/>
							<InlineSVG src={logo} className='svg'></InlineSVG>
							<Component></Component>
						</div>
						<div className={styles1.root}>
							<h1>默认页面2</h1>
							<img src={bg} alt=""/>
						</div>
					</div>
				</DocumentTitle>
		)
	}
})

function mapStateToProps(state) {
	return {

	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
