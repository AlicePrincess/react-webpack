import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import answer from './answer'
import loading from './loading'
import user from './user'
import weChat from './weChat'
import sound from './sound'

export const reducer = combineReducers({
	route: routerStateReducer,
	answer,
	loading,
	user,
	weChat,
	sound,
})
