import config from '../config'
import axios from 'axios'

export const TUSO_RECEIVED = 'TUSO_RECEIVED'

export function requestTuso() {
    return (dispatch) => {
        axios.get(`${config.apiServerUrl}/tuso.json`)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: TUSO_RECEIVED,
                        payload: response.data
                    })
                } else {
                    throw Error(`${TUSO_RECEIVED}`)
                }
            }).catch((response) => {
                throw Error(`${TUSO_RECEIVED}`)
            })
    }
}
