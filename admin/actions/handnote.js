import config from '../config'
import axios from 'axios'
import _ from 'underscore'

export const HANDNOTE_MINE_FETCH = ['HANDNOTE_MINE_FETCH_REQUEST', 'HANDNOTE_MINE_FETCH_SUCCESS', 'HANDNOTE_MINE_FETCH_FAILURE']
export const UPDATE_HANDNOTE = ['UPDATE_HANDNOTE_REQUEST', 'UPDATE_HANDNOTE_SUCCESS', 'UPDATE_HANDNOTE_FAILURE']
export const ALIGN_LEFT = 'v1/left'
export const ALIGN_CENTER = 'v1/center'
export const ALIGN_RIGHT = 'v1/right'

/**
 * 获取我的所有随记
 */
export function fetchMine(userUUID, authToken) {
    return {
        types: HANDNOTE_MINE_FETCH,
        callAPI: () => axios({
            method: 'get',
            url: config.api.handnote.getMine(userUUID),
            data: {
                since_id: 0,
                max_id: 1000000,
                page: 0,
                count: 10000000,
            },
            headers: {
                "Content-Type": "application/json",
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        })
    }
}

/**
 * 更新随记
 */
export function updateHandnote(noteUUID, newData, authToken) {
    return {
        types: UPDATE_HANDNOTE,
        callAPI: () => axios({
            method: 'put',
            url: config.api.handnote.update(noteUUID),
            data: _.pick(newData, 'title', 'content', 'style', 'timestamp'),
            headers: {
                "Content-Type": "application/json",
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        })
    }
}
