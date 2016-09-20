import config from '../config'
import axios from 'axios'
import _ from 'underscore'

export const FETCH_ALL_ACCOUNT = ['FETCH_ALL_ACCOUNT_REQUEST', 'FETCH_ALL_ACCOUNT_SUCCESS', 'FETCH_ALL_ACCOUNT_FAILURE']

/**
 * 查询所有用户的信息。
 * @param  {String} token
 * @param  {Number} offsetHead
 * @param  {Number} offsetTail
 * @param  {String} startTime e.g. "2016-05-12T17:08:01.982+08:00"
 * @param  {String} endTime e.g. "2016-08-12T17:08:01.982+08:00"
 */
export function fetchAllAccount(token, offsetHead, offsetTail, startTime, endTime, IsDesc=false) {
    return {
        types: FETCH_ALL_ACCOUNT,
        callAPI: () => axios({
            method: 'post',
            url: config.api.account.get,
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
