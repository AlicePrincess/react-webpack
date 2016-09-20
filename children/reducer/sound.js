import {fromJS} from 'immutable'
import {PLAY_CIRCLE, PLAY_FLIP} from '../actions/sound'

export default (state = fromJS({}), action) => {
    switch (action.type) {
        case PLAY_CIRCLE:
            return state
        case PLAY_FLIP:
            return state
        default:
            return state
    }
}