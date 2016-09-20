import {Map, fromJS} from 'immutable'
import {SHARE_PHOTO_INFO_RECEIVED} from '../actions/share'

const initialState = fromJS({
	"user": {
		"name": "",
		"avatar": ""
	},
	"photo": {
		"datetime": new Date(),
		"address": "",
		"url": "",
		"title": "",
		"description": ""
	}
})

export default (state = initialState, action) => {
	// console.log(action.type);
	// console.log(">>>");
    switch (action.type) {
    	case SHARE_PHOTO_INFO_RECEIVED:
    		return fromJS(action.payload) 
        default:
            return state
    }
}