import {Map, List} from 'immutable'
import {LOGIN, LOGOUT, FETCH_USER} from '../actions/user'

const initialState = Map({
	/*
		-1 ~ 未进行验证
		0 ~ 正在进行验证
		1 ~ 登录成功
		2 ~ 登录失败，账号不存在
		3 ~ 登录失败，密码错误
		4 ~ 登录失败，网络连接出错
		5 ~ 利用前一次登录保留的信息登录
	 */
	loginState: localStorage.getItem('token') ? -1 : 5,
	token: localStorage.getItem('token'),
	uuid: localStorage.getItem('uuid'),
})

// 模拟数据
const LOGIN_RESPONSE = [{
	// 登录成功
	type: LOGIN[0],
	response: {
		status: 200,
		data: {
			"birthday": "2016-07-08T11:44:01+08:00",
			"followees": 6,
			"followers": 0,
			"friends": 2,
			"gender": "user_gender_male",
			"id": 90,
			"images": 13,
			"location": {
				"country": "",
				"state": "北京市",
				"city": "北京市",
				"district": "昌平区"
			},
			"nickname": "Jermine",
			"nuclear_key": "db9aq2yJmLSAyfyehDzU9kpptyeDFIht",
			"photo_create_at": "2016-07-21T13:35:27+08:00",
			"real_name": "XiaoMing",
			"token": "y49bBHx4nOw7m6WWidjM28aGALfbEoo0",
			"tuso_create_at": "2016-07-21T16:43:55.089209676+08:00",
			"tuso_id": "399389",
			"tusos": 0,
			"user_create_at": "2016-07-05T11:16:13+08:00",
			"uuid": "b6a02129-c9d1-408d-af3e-eb886e6162e1"
		}
	}
}, {
	// 账号不存在
	type: LOGIN[0],
	response: {
		status: 403,
		data: {
			code: 1001,
			message: "Invalid Email"
		}
	}
}, {
	// 密码错误
	type: LOGIN[0],
	response: {
		status: 403,
		data: {
			code: 1004,
			message: "Wrong Password"
		}
	}
}]

export default (state = initialState, action) => {
	// console.log(LOGIN)
	// console.log(action.type);
    switch (action.type) {
    	// 登入
		case LOGIN[0]:
			return state.set('loginState', 0)
		case LOGIN[1]:
			return handleLoginResponse(state, action)
		case LOGIN[2]:
			// For debug
			// return handleLoginResponse(state, LOGIN_RESPONSE[0])
			return handleLoginResponse(state, action)

		// 登出
		case LOGOUT:
			localStorage.removeItem('token')
			localStorage.removeItem('uuid')
			return Map({
				loginState: -1,
				token: null,
				uuid: null,
			})

		// 获取我的个人信息
		case FETCH_USER[1]:
			return state.set('loginState', 1).merge(new Map(action.response.data))
        default:
            return state
    }
}

function handleLoginResponse(state, action) {
	console.log(action)
	const data = action.response.data
	
	if (action.response.status === 200) {
		localStorage.setItem('token', data.token)
		localStorage.setItem('uuid', data.uuid)
		// Login success
		return state.set('loginState', 1).merge(new Map(data))
	} else if (action.response.status === 403) {
		// Invalid account
		if (data.code === 1001) {
			return state.set('loginState', 2)
		}

		// Incorrect password
		if (data.code === 1004) {
			return state.set('loginState', 3)
		}
	}else{
		// Network error
		return state.set('loginState', 4)
	}
}
