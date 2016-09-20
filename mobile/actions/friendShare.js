import config from '../config'
import axios from 'axios'

export const TUSO_INFO_RECEIVED = 'TUSO_INFO_RECEIVED'

export function requestTusoInfo() {
    return (dispatch) => {
        axios.get(`${config.apiServerUrl}/friendShare.json`)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: TUSO_INFO_RECEIVED,
                        payload: response.data
                    })
                } else {
                    throw Error(`${TUSO_INFO_RECEIVED}`)
                }
            }).catch((response) => {
                throw Error(`${TUSO_INFO_RECEIVED}`)
            })
    }
}
