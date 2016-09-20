import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import share from './share'

export const reducer = combineReducers({
	route: routerStateReducer,
	share
})
