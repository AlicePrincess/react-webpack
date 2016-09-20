import {Map, List} from 'immutable'
import {FETCH_ALL_TUSO, FETCH_MINE_TOSU, DELETE_TOSU, CREATE_TOSU, FETCH_TUSO} from '../actions/tuso'
import _ from 'underscore'

const initialState = Map({
	// 我的所有图说列表
	mine: List([]),
	/*
		0 ~ 加载完成
		1 ~ 加载中
		2 ~ 加载出错
	 */
	mineLoadingState: 0,

	// 所有人的所有图说列表
	all: List([]),
	allCount: 0,
	/*
		0 ~ 加载完成
		1 ~ 加载中
		2 ~ 加载出错
	 */
	allLoadingState: 0,
})

function decrTimeSorter(a, b) {
	return new Date(b.timestamp) - new Date(a.timestamp)
}

export default (state = initialState, action) => {
    switch (action.type) {
    	// 我的图说
		case FETCH_MINE_TOSU[0]:
			return state.set('mineLoadingState', 1)
		case FETCH_MINE_TOSU[1]:
			if (action.response.status === 200) {
				const data = action.response.data
				return state.set('mineLoadingState', 0)
					.update('mine', originList =>
						originList.merge(List(data.list)
							.filter(newData => !originList.some(originData => originData.uuid === newData.uuid))
						).sort(decrTimeSorter)
					)
			}
		case FETCH_MINE_TOSU[2]:
			return state.set('mineLoadingState', 2)

		// 所有人图说
		case FETCH_ALL_TUSO[0]:
			return state.set('allLoadingState', 1)
		case FETCH_ALL_TUSO[1]:
			if (action.response.status === 200) {
				const data = action.response.data.data
				// data.list = _.filter(data.list, v => {
				// 	return !!v.images.length
				// })

				return state.set('allLoadingState', 0).set('allCount', data.count)
					.update('all', originList =>
						originList.merge(List(data.list)
							.filter(newData => !originList.some(originData => originData.uuid === newData.uuid))
						).sort(decrTimeSorter)
					)
			}
		case FETCH_ALL_TUSO[2]:
			// return fakeHandler(state, action)
			return state.set('allLoadingState', 2)

		case FETCH_TUSO:
			const data = action.payload.data
			return state.update('mine', mineList=>mineList.map(v=>{
				return v.uuid === data.uuid ? data : v
			})).update('all', allList=>allList.map(v=>{
				return v.uuid === data.uuid ? data : v
			}))

		case DELETE_TOSU[1]:
			return state.update('mine', mine => mine.filterNot(v => ~action.uuidList.indexOf(v.uuid)))
				.sort(decrTimeSorter)

		case CREATE_TOSU[1]:
			return state.update('mine', mine => mine.push(action.response.data))
		default:
			return state
    }
}

const data = {
	"comment_count": 0,
	"id": 91,
	"images": [{
		"comment_sum": 0,
		"display_image": {
			"display_height": 168,
			"display_url": "http://7xodxr.com2.z0.glb.qiniucdn.com/82f107d5-47ad-4826-9de9-81d368223c1e.jpg",
			"display_url_square": "http://7xodxr.com2.z0.glb.qiniucdn.com/82f107d5-47ad-4826-9de9-81d368223c1e.jpg?imageMogr2/thumbnail/!168x168r/gravity/center/crop/168x168",
			"display_url_thumbnail": "http://7xodxr.com2.z0.glb.qiniucdn.com/82f107d5-47ad-4826-9de9-81d368223c1e.jpg",
			"display_url_waterfall": "http://7xodxr.com2.z0.glb.qiniucdn.com/82f107d5-47ad-4826-9de9-81d368223c1e.jpg?imageMogr2/crop/420x",
			"display_width": 192,
			"edit_params": "{}",
			"file_size": 7752
		},
		"display_version": 2,
		"geo_location": "{}",
		"height": 168,
		"id": 10352,
		"primary_color": "#ffffff",
		"timestamp": "2016-07-27T10:00:33+08:00",
		"uuid": "965dfdb3-c2b0-4e08-b164-2a3bbd0b1727",
		"width": 192
	}],
	"photo_count": 1,
	"starred_count": 0,
	"timestamp": "2016-07-27T10:00:33+08:00",
	"user": {
		"birthday": "2016-07-08T11:44:01+08:00",
		"followees": 6,
		"followers": 0,
		"friends": 5,
		"gender": "user_gender_male",
		"id": 90,
		"images": 241,
		"location": {
			"country": "",
			"state": "北京市",
			"city": "北京市",
			"district": "昌平区"
		},
		"nickname": "Jermine",
		"photo_create_at": "2016-07-21T13:35:27+08:00",
		"real_name": "XiaoMing",
		"tuso_create_at": "2016-07-29T10:00:20.029805595+08:00",
		"tuso_id": "399389",
		"tusos": 0,
		"user_create_at": "2016-07-05T11:16:13+08:00",
		"uuid": "b6a02129-c9d1-408d-af3e-eb886e6162e1"
	},
	"uuid": "d616fe6b-e28b-470c-9cf2-84fcac101138"
}

const emptyData = {
	"comment_count": 0,
	"id": -1,
	"images": [],
	"photo_count": 0,
	"starred_count": 0,
	"timestamp": "2016-07-27T10:00:33+08:00",
	"user": {
		"birthday": "2016-07-08T11:44:01+08:00",
		"followees": 0,
		"followers": 0,
		"friends": 0,
		"gender": "user_gender_male",
		"id": 0,
		"images": 0,
		"location": {
			"country": "",
			"state": "",
			"city": "",
			"district": ""
		},
		"nickname": "空",
		"photo_create_at": "2016-07-21T13:35:27+08:00",
		"real_name": "空",
		"tuso_create_at": "2016-07-29T10:00:20.029805595+08:00",
		"tuso_id": "0",
		"tusos": 0,
		"user_create_at": "2016-07-05T11:16:13+08:00",
		"uuid": ""
	},
	"uuid": ""
}


function fakeHandler(state, action){
	const startIndex = action.offsetHead >= 0 ? action.offsetHead : 1000 + action.offsetTail + 1

	let ret = state.set('allCount', 1000)
	List(_.range(Math.abs(action.offsetHead - action.offsetTail)))
		.map(v => {
			ret = ret.update('all', all => all.set(startIndex + v, data))
		})

	return ret.update('all', all => all.map(v => v ? v : data))
}
