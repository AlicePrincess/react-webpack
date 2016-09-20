import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'



export const reducer = combineReducers({
	route: routerStateReducer
})
