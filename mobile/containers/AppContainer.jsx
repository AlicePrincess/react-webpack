import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import InlineSVG from 'svg-inline-react'
import logo from '../assets/images/logo.svg'
import styles from './AppContainer.scss'



const AppContainer = React.createClass({
	render: function() {
		return (
				<DocumentTitle title="mobile">
					<div style={styles.root}>
						mobile
						<InlineSVG src={logo}></InlineSVG>
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
