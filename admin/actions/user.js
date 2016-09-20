import config from '../config'
import axios from 'axios'

export const LOGIN = ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE']
export const FETCH_USER = ['FETCH_USER_REQUEST', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE']
export const LOGOUT = 'LOGOUT'


/**
 * @param  {string} username
 * @param  {string} password
 */
export function login(username, password) {
    return {
        types: LOGIN,
        callAPI: () => axios({
            method: 'post',
            url: config.api.user.login,
            data: {
                username,
                password,
            },
            headers: {
                "Content-Type": "application/json",
                "X-Tuso-Device-Token": config.deviceToken,
            },
        })
    }
}

// 用户登出
export function logout() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
        })
    }
}

/**
 * @param  {String} token 用户的token
 * @param  {String} uuid  待查询用户的uuid
 */
export function restoreFromToken(token, uuid) {
    return {
        types: FETCH_USER,
        callAPI: () => axios({
            method: 'get',
            url: config.api.user.get(uuid),
            params: {
                uuid,
            },
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": token,
            },
        })
    }
}
