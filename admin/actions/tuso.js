import config from '../config'
import axios from 'axios'
import _ from 'underscore'
import moment from 'moment'

export const FETCH_MINE_TOSU = ['FETCH_MINE_TOSU_REQUEST', 'FETCH_MINE_TOSU_SUCCESS', 'FETCH_MINE_TOSU_FAILURE']
export const CREATE_TOSU = ['CREATE_TOSU_REQUEST', 'CREATE_TOSU_SUCCESS', 'CREATE_TOSU_FAILURE']
export const DELETE_TOSU = ['DELETE_TOSU_REQUEST', 'DELETE_TOSU_SUCCESS', 'DELETE_TOSU_FAILURE']
export const FETCH_ALL_TUSO = ['FETCH_ALL_TUSO_REQUEST', 'FETCH_ALL_TUSO_SUCCESS', 'FETCH_ALL_TUSO_FAILURE']
export const FETCH_TUSO = 'FETCH_TUSO'

/**
 * 获取所有人的图说列表
 */
export function fetchAllTuso(token, offsetHead, offsetTail, startTime, endTime, IsDesc = true) {
  console.log(token, offsetHead, offsetTail, startTime, endTime);
    return {
        types: FETCH_ALL_TUSO,
        callAPI: () => axios({
            method: 'post',
            url: config.api.tuso.getAll,
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

export function fetchTuso(uuid, authToken){
    return (dispatch) => {
        axios({
            method: 'get',
            url: config.api.tuso.get(uuid),
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        }).then((response) => {
            dispatch({
                type: FETCH_TUSO,
                payload: response,
            })
        })
    }
}

/**
 * 获取用户的所有图说列表
 *
 * @param  userUUID  [用户的uuid]
 * @param  authToken
 */
export function fetchUserTuso(userUUID, authToken) {
    return {
        types: FETCH_MINE_TOSU,
        callAPI: () => axios({
            method: 'get',
            url: config.api.tuso.getMine(userUUID),
            params: {
                since_id: 0,
                max_id: 1000000,
                page: 0,
                count: 10000000,
            },
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        })
    }
}

/**
 * @param  {Array} uuidList 被删除图说的uuid的列表
 */
export function deleteTuso(uuidList, authToken) {
    return {
        types: DELETE_TOSU,
        callAPI: () => {
            return Promise.all(_.map(uuidList, uuid =>
                axios({
                    method: 'delete',
                    url: config.api.tuso.delete(uuid),
                    headers: {
                        "X-Tuso-Device-Token": config.deviceToken,
                        "X-Tuso-Authentication-Token": authToken,
                    },
                })
            ))
        },
        payload: {
            uuidList,
        },
    }
}

/**
 * @param  {String}   uuidTuso  被点赞的图说uuid
 * @param  {String}   authToken
 * @param  {Function} cb        回调函数
 */
export function likeTuso(uuidTuso, authToken, cb) {
    axios.put(config.api.tuso.like(uuidTuso), {}, {
        headers: {
            "X-Tuso-Device-Token": config.deviceToken,
            "X-Tuso-Authentication-Token": authToken,
        },
    }).then((response) => {
        cb && cb(uuidTuso)
    })
}

/**
 * @param  {String}   uuidTuso  被点赞的图说uuid
 * @param  {String}   authToken
 * @param  {Function} cb        回调函数
 */
export function dislikeTuso(uuidTuso, authToken, cb) {
    axios.put(config.api.tuso.dislike(uuidTuso), {}, {
        headers: {
            "X-Tuso-Device-Token": config.deviceToken,
            "X-Tuso-Authentication-Token": authToken,
        },
    }).then((response) => {
        cb && cb(uuidTuso)
    })
}

/**
 * @param  {Array} images 图说中图片的信息

    [{
        image: "349c569a-fb74-4d98-9ca3-31929581dc40",
        handnote: {
            title: "",
            content: "",
            textAlign: ALIGN_LEFT,
        },
    },{
        image: "349c569a-fb74-4d98-9ca3-31929581dc40",
    }]

 *
 * @param  {String} authToken
 */
export function createTuso(images, authToken) {
    return {
        types: CREATE_TOSU,
        callAPI: () => {
            const promiseList = _.map(_.filter(images, v => v.handnote), w => {
                const handnote = w.handnote
                return axios({
                    method: 'post',
                    url: config.api.handnote.create(w.image),
                    data: {
                        title: handnote.title,
                        content: handnote.content,
                        style: handnote.textAlign,
                        timestamp: moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
                    },
                    headers: {
                        "X-Tuso-Device-Token": config.deviceToken,
                        "X-Tuso-Authentication-Token": authToken,
                        "Content-Type": "application/json",
                    },
                })
            })

            return new Promise(function(resolve, reject) {
                Promise.all(promiseList).then(function(notes) {
                    notes = notes.map(note => note.data)

                    axios({
                        method: 'post',
                        url: config.api.tuso.create,
                        data: {
                            uuids: _.map(images, v => v.image),
                            timestamp: moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
                        },
                        headers: {
                            "X-Tuso-Device-Token": config.deviceToken,
                            "X-Tuso-Authentication-Token": authToken,
                        },
                    }).then((response) => {
                        response.data.images = _.map(response.data.images, (image) => {
                            const v = _.find(notes, (note) => note.uuid === image.uuid)
                            return v ? v : image
                        })
                        resolve(response)
                    })
                })
            })
        }
    }
}
