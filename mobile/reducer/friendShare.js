import {Map, fromJS} from 'immutable'
import {TUSO_INFO_RECEIVED} from '../actions/friendShare'

const initialState = fromJS({
    "friendShare": {

    }
}
)

export default (state = initialState, action) => {
    switch (action.type) {
    	case TUSO_INFO_RECEIVED:
    		return fromJS(action.payload)
      default:
        return state
    }
}
