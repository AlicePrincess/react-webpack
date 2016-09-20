import {Map, fromJS} from 'immutable'
import {WECHAT_RECEIVED} from '../actions/weChat'

const initialState = fromJS({
}
)

export default (state = initialState, action) => {
    switch (action.type) {
    	case WECHAT_RECEIVED:
    		return fromJS(action.payload)
      default:
        return state
    }
}
