import config from '../config'
import axios from 'axios'

export const SHARE_PHOTO_INFO_RECEIVED = 'SHARE_PHOTO_INFO_RECEIVED'

export function requestSharePhotoInfo() {
    return (dispatch) => {
        axios.get(`${config.apiServerUrl}/data/share.json`)
            .then((response) => {
                if (response.status === 200) {
                     console.log(response.data);
                    dispatch({
                        type: SHARE_PHOTO_INFO_RECEIVED,
                        payload: response.data
                    })
                } else {
                     throw Error(`${SHARE_PHOTO_INFO_RECEIVED}`)
                }
            }).catch((response) => {
                throw Error(`${SHARE_PHOTO_INFO_RECEIVED}`)
            })
    }
}