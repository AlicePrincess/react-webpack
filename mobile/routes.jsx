import AppContainer from './containers/AppContainer'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'
import {WechatShare} from './containers/wechatShare'

const routes = <ReduxRouter>
	<Route path="/">
		<IndexRoute component={WechatShare}></IndexRoute>
		// <Route path="app" component={AppContainer}></Route>
		<Route path="index.html" component={WechatShare}></Route>
	</Route>
</ReduxRouter>

export default routes
