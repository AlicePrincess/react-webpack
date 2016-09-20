import {Map} from 'immutable'
import {combineReducers} from 'redux-immutablejs'
import { routerStateReducer } from 'redux-router';

import friendShare from './friendShare'
import tuso from './tuso'
import weChat from './weChat'



export const reducer = combineReducers({
	route: routerStateReducer,
	friendShare,
	tuso,
	weChat

})
