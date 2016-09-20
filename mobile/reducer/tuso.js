import {Map, fromJS} from 'immutable'
import {TUSO_RECEIVED} from '../actions/tuso'

const initialState = fromJS({
}
)

export default (state = initialState, action) => {
    switch (action.type) {
    	case TUSO_RECEIVED:
    		return fromJS(action.payload)
      default:
        return state
    }
}
