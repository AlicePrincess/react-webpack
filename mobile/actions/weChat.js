import config from '../config'
import axios from 'axios'
import base64 from 'base-64'

export const WECHAT_RECEIVED = 'WECHAT_RECEIVED'

export function requestWeChat() {
    return (dispatch) => {
        axios.get(`http://api.dev.tusoapp.com:8080/v1/wechat/js_ticket/` + base64.encode(window.location.href))
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: WECHAT_RECEIVED,
                        payload: response.data
                    })
                } else {
                    throw Error(`${WECHAT_RECEIVED}`)
                }
            }).catch((response) => {
                throw Error(`${WECHAT_RECEIVED}`)
            })
    }
}
