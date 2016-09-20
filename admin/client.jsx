import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import {createMyStore} from './store'
import {reducer} from './reducer'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import 'antd/dist/antd.less'
import 'ress'

// create the app store
const store = createMyStore(reducer)

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('react-root')
)
