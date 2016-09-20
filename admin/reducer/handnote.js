import {Map, List,fromJS} from 'immutable'
import {HANDNOTE_MINE_FETCH,HANDNOTE_MINE_DELETE} from '../actions/handnote'

const initialState = Map({
	// 我的所有随记列表
	mine: List(),
	/*
		0 ~ 加载完成
		1 ~ 加载中
		2 ~ 加载出错
	 */
	mineLoadingState: 0,
})

export default (state = initialState, action) => {
    switch (action.type) {
		case HANDNOTE_MINE_FETCH[0]:
			return state.set('mineLoadingState', 1)
		case HANDNOTE_MINE_FETCH[1]:
			if (action.response.status === 200) {
				const data = action.response.data
				return state.set('mineLoadingState', 0)
					.set('mine', List(data).filter(v => v.note))

			}
		case HANDNOTE_MINE_FETCH[2]:
			return state.set('mineLoadingState', 2)
		
		default:
			return state
    }
}
