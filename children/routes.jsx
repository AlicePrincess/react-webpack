import AppContainer from './containers/AppContainer'
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'
import LoadingContainer from './containers/LoadingContainer'
import CountdownComponent from './containers/CountdownContainer'
import FailureComponent from './containers/FailureContainer'
import Page404 from './containers/404'
import OtherGradesComponent from './containers/OtherGradesContainer'

const routes = <ReduxRouter>
	<Route path="/" component={LoadingContainer}>
		<IndexRoute component={LoadingContainer}></IndexRoute>
		<Route path="countdown" component={CountdownComponent}></Route>
		<Route path="failure" component={FailureComponent}></Route>
	</Route>
	<Route path="/404" component={Page404}></Route>
	<Route path="/other" component={OtherGradesComponent}></Route>
</ReduxRouter>

export default routes
