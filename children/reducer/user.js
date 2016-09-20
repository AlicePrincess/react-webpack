import {fromJS} from 'immutable'
import {USER_INFO_RECEIVED, RESTORE_USER} from '../actions/user'

const initialState = fromJS({})

export default (state = initialState, action) => {
    switch (action.type) {
    	case RESTORE_USER:
    		return fromJS(action.payload)
        case USER_INFO_RECEIVED:
        	if (!action.payload) {
        		return fromJS(JSON.parse(localStorage.getItem('user')))
        	}

        	localStorage.setItem('user', JSON.stringify(action.payload))
            return fromJS(action.payload)
      default:
        return state
    }
}