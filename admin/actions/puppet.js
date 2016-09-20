import config from '../config'
import axios from 'axios'
import _ from 'underscore'

export const CREATE_PUPPET = ['CREATE_PUPPET_REQUEST', 'CREATE_PUPPET_SUCCESS', 'CREATE_PUPPET_FAILURE']
export const UPDATE_PUPPET = ['UPDATE_PUPPET_REQUEST', 'UPDATE_PUPPET_SUCCESS', 'UPDATE_PUPPET_FAILURE']
export const DELETE_PUPPET = ['DELETE_PUPPET_REQUEST', 'DELETE_PUPPET_SUCCESS', 'DELETE_PUPPET_FAILURE']
export const RESET_PASSWORD = ['RESET_PASSWORD_REQUEST', 'RESET_PASSWORD_SUCCESS', 'RESET_PASSWORD_FAILURE']
export const FETCH_ALL_PUPPET = ['FETCH_ALL_PUPPET_REQUEST', 'FETCH_ALL_PUPPET_SUCCESS', 'FETCH_ALL_PUPPET_FAILURE']

/**
 * 查询马甲号的信息。
 * @param  {String} token
 * @param  {Number} offsetHead
 * @param  {Number} offsetTail
 * @param  {String} startTime e.g. "2016-05-12T17:08:01.982+08:00"
 * @param  {String} endTime e.g. "2016-08-12T17:08:01.982+08:00"
 */
export function fetchAllPuppet(token, offsetHead, offsetTail, startTime, endTime, IsDesc = false) {
    return {
        types: FETCH_ALL_PUPPET,
        callAPI: () => axios({
            method: 'post',
            url: config.api.puppet.get,
            data: {
                IsDesc,
                orderBy: "ID",
                offsetHead,
                offsetTail,
                startTime,
                endTime,
            },
            headers: {
                "Content-Type": "application/json",
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": token,
            },
        }),
        payload: {
            offsetHead,
            offsetTail,
        },
    }
}

/**
 * 批量生成马甲号
 *
 * @param  offsetHead
 */
export function createPuppet(count, pwd, authToken) {
    return {
        types: CREATE_PUPPET,
        callAPI: () => axios({
            method: 'post',
            url: config.api.puppet.post,
            data: `count=${count || 0}&pwd=${pwd}`,
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
                "Content-Type": 'application/x-www-form-urlencoded',
            },
        }),
    }
}

/**
 * @param  {String} authToken 
 * @param  {Array} pup_ids   进行关注行为的马甲号
 * @param  {Array} usr_ids   被关注的用户
 */
export function followUser(authToken, pup_ids, usr_ids) {
    return axios({
        method: 'put',
        url: config.api.puppet.follow.post,
        data: {
            pup_ids,
            usr_ids,
        },
        headers: {
            "X-Tuso-Device-Token": config.deviceToken,
            "X-Tuso-Authentication-Token": authToken,
        },
    })
}

/**
 * @param  {String} authToken 
 * @param  {Array} pup_ids   进行取消关注行为的马甲号
 * @param  {Array} usr_ids   被关注的用户
 */
export function unfollowUser(authToken, pup_ids, usr_ids) {
    return axios({
        method: 'put',
        url: config.api.puppet.follow.delete,
        data: {
            pup_ids,
            usr_ids,
        },
        headers: {
            "X-Tuso-Device-Token": config.deviceToken,
            "X-Tuso-Authentication-Token": authToken,
        },
    })
}

/**
 * @param  {Arraye} pup_ids   想要删除的马甲号id列表
 * @param  {String} authToken 
 */
export function deletePuppet(pup_ids, authToken) {
    return {
        types: DELETE_PUPPET,
        callAPI: () => axios({
            method: 'delete',
            url: config.api.puppet.delete,
            data: {
                pup_ids,
            },
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },

        }),
        payload: {
            pup_ids,
        }
    }
}


/**
 * @param  {Array} pup_ids    马甲号列表
 * @param  {Array} news_uuids 被点赞的图说列表
 * @param  {String} authToken  
 */
export function likeTuso(pup_ids, news_uuids, authToken) {
    return {
        types: CREATE_PUPPET,
        callAPI: () => axios({
            method: 'post',
            url: config.api.puppet.like.post,
            data: {
                pup_ids,
                news_uuids,
            },
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        }),
    }
}

/**
 * @param  {String} pwd 新密码 
 * @param  {String} authToken 
 * @param  {Array?} pup_ids   被重置密码的马甲号列表，若不传入该参数则表示重置所有该账户下的马甲号的密码。
 */
export function resetPassword(pwd, authToken, pup_ids) {
    return {
        types: RESET_PASSWORD,
        callAPI: () => axios({
            method: 'put',
            url: config.api.puppet.password.put,
            data: {
                pup_ids,
                pup_all: !pup_ids,
                pwd,
            },
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        }),
    }
}

/**
 * @param  {Array} informationList 马甲号新信息组成的列表

e.g.

[{
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
}]
*/
export function updatePuppet(informationList, authToken) {
    return {
        types: UPDATE_PUPPET,
        callAPI: () => axios({
            method: 'put',
            url: config.api.puppet.put,
            data: informationList,
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        }),
        payload: {
            informationList,
        },
    }
}