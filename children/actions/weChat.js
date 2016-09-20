import config from '../config'
import axios from 'axios'
import base64 from 'base-64'

export const WECHAT_RECEIVED = 'WECHAT_RECEIVED'

export function requestWeChat() {
    return (dispatch) => {
        axios.post(config.api.weChat.get, {
            url: window.location.href.split('#')[0]
        }).then((response) => {

            if (response.status === 200) {
              dispatch({
                    type: WECHAT_RECEIVED,
                    payload: response.data
                })
            } else {
                throw Error(`${WECHAT_RECEIVED}`)
            }
        }).catch(() => {
            throw Error(`${WECHAT_RECEIVED}`)
        })
    }
}
