import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import user from './user'
import handnote from './handnote'
import tuso from './tuso'
import puppet from './puppet'
import account from './account'

export const reducer = combineReducers({
	route: routerStateReducer,
	user,
	handnote,
	tuso,
	puppet,
	account,
})