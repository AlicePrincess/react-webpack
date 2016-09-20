import {fromJS} from 'immutable'
import {PRELOADIN_COMPLETE, UPDATE_LOADING_ACCOMPLISH} from '../actions/loading'

const initialState = fromJS({
	complete: false,
	accomplish: 0,
	loadingVar: 0, // random element which decides download some specific resources 	
})

export default (state = initialState, action) => {
    switch (action.type) {
        case PRELOADIN_COMPLETE:
            return state.set('complete', true).set('loadingVar', action.payload.loadingVar)
        case UPDATE_LOADING_ACCOMPLISH:
        	return state.set('accomplish', action.payload.accomplish)
      default:
        return state
    }
}
