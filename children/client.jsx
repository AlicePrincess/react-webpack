import 'babel-polyfill'
import './containers/common.scss'
import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import './utils/ga'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import {createMyStore} from './store'
import {reducer} from './reducer'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'

// create the app store
const store = createMyStore(reducer)

localStorage.clear()

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('react-root')
)