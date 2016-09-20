import {Map, List,fromJS} from 'immutable'
import {CREATE_PUPPET, DELETE_PUPPET, UPDATE_PUPPET, FETCH_ALL_PUPPET} from '../actions/puppet'
import _ from 'underscore'

const initialState = Map({
	allCount: 0,

	list: List([{
		"Email": "xu@ngs.tech",
		"Gender": 1,
		"Location": {
			"country": "中国",
			"state": "玄武区",
			"city": "南京",
			"district": "珠江路32号"
		},
		"Nickname": "小明",
		"RealName": "张无极",
		"MobileNumber": "138933244",
		"ID": 123,
		"Birthday": "2016-08-05T16:13:45.178830361+08:00",
		"UUID": "14cb9481-0de3-45e1-a651-a6508ba6e785"
	}]),
})

function decrTimeSorter(a, b) {
	return new Date(b.user_create_at) - new Date(a.user_create_at)
}

export default (state = initialState, action) => {
    switch (action.type) {
    	case FETCH_ALL_PUPPET[0]:
			return state.set('allLoadingState', 1)
		case FETCH_ALL_PUPPET[1]:
			if (action.response.status === 200) {
				const data = action.response.data.data

			return state.set('allLoadingState', 0).set('allCount', data.count)
				.update('list', originList =>
					originList.merge(List(data.list).filter(v => !!v)
						.filter(newData => !originList.some(originData => originData.uuid === newData.uuid))
					).sort(decrTimeSorter)
				)
			}
		case FETCH_ALL_PUPPET[2]:
			return state.set('allLoadingState', 2)

		case CREATE_PUPPET[1]:
			return state.update('list', (list)=>list.push(...action.response.data.data))
		case DELETE_PUPPET[1]:
			return state.update('list', list => list.filter((v) => {
				return !~action.pup_ids.indexOf(v.id)
			}))
		case UPDATE_PUPPET[1]:
			return state.update('list', list => list.map((v) => {
				return _.find(action.informationList, w=>w.id===v.id) || v
			}))
		default:
			return state
    }
}
