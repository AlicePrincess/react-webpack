import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'


const AppContainer = React.createClass({
	render: function() {
		return (
				<DocumentTitle title="图说网页版">
					<div>
						图说网页版
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
