import {Map, List} from 'immutable'
import {FETCH_ALL_ACCOUNT} from '../actions/account'
import _ from 'underscore'

const initialState = Map({
	// 所有的账户列表
	allCount: 0,
	all: List([]),
	/*
		0 ~ 加载完成
		1 ~ 加载中
		2 ~ 加载出错
	 */
	allLoadingState: 0,
})

function decrTimeSorter(a, b) {
	return new Date(b.user_create_at) - new Date(a.user_create_at)
}

export default (state = initialState, action) => {
    switch (action.type) {
		case FETCH_ALL_ACCOUNT[0]:
			return state.set('allLoadingState', 1)
		case FETCH_ALL_ACCOUNT[1]:
			if (action.response.status === 200) {
				const data = action.response.data.data

			return state.set('allLoadingState', 0).set('allCount', data.count)
				.update('all', originList =>
					originList.merge(List(data.list).filter(v => !!v)
						.filter(newData => !originList.some(originData => originData.uuid === newData.uuid))
					).sort(decrTimeSorter)
				)
			}
		case FETCH_ALL_ACCOUNT[2]:
			return state.set('allLoadingState', 2)

		default:
			return state
    }
}
