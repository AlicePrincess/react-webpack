import config from '../config'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import moment from 'moment'
import _ from 'underscore'

function upload(imageData, authToken) {
    return new Promise((resolve, reject) => {
        // 获取上传照片所需要的token
        axios({
            method: 'get',
            url: config.api.image.getUploadToken,
            headers: {
                "X-Tuso-Device-Token": config.deviceToken,
                "X-Tuso-Authentication-Token": authToken,
            },
        }).then((res) => {
            if (res.status === 200) {
                // get the frame of the image 
                const img = new Image()
                img.onload = () => {
                    const data = new FormData()
                    data.append('file', imageData)
                    data.append('token', res.data['QN-Token'])
                    data.append('x:ut', authToken)
                    data.append('x:privacy', 'photo_privacy_public')
                    data.append('x:md5', CryptoJS.MD5(imageData).toString())
                    data.append('x:primary_color', "#ffffff")
                    data.append('x:geolocation', "{}")
                    data.append('x:edit_params', "{}")
                    data.append('x:exif', "{}")
                    data.append('x:width', `${img.width}`)
                    data.append('x:height', `${img.height}`)
                    data.append('x:timestamp', moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"))
                    axios.post(config.api.image.upload, data).then((res) => {
                        if (res.status === 200) {
                            resolve(res.data.data)
                        }
                    }).catch(error => {
                        reject(error)
                    })
                }
                img.src = (window.URL || window.webkitURL).createObjectURL(imageData)
            }
        })
    }).catch(error => {
        reject(error)
    })
}

/**
 * @param  {Array} imageDataList
 * @param  {String} authToken 
 * @return {Promise} onFullfilled handler will get an array of image information
 */
export function uploadImageList(imageDataList, authToken){
    return Promise.all(_.map(imageDataList, v=>upload(v, authToken)))
}