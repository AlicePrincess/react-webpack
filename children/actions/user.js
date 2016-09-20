import config from '../config'
import axios from 'axios'

export const USER_INFO_RECEIVED = 'USER_INFO_RECEIVED'
export const RESTORE_USER = 'RESTORE_USER'

export function fetchUserInfo(token){
    return (dispatch) => {
        // retrieve user info from local storage
        if (!token) {
            dispatch({
                type: USER_INFO_RECEIVED
            }) 
        }

        axios.post(config.api.user.get, {
            token,
        }).then((response) => {
            if (response.status === 200) {
                const userInfo = response.data.data
                userInfo.avatarSource = userInfo.avatar
                userInfo.avatar = `${userInfo.avatarSource}?imageView2/1/w/100/h/100/q/90`

                dispatch({
                    type: USER_INFO_RECEIVED,
                    payload: userInfo,
                })
            } else {
                throw Error(`${USER_INFO_RECEIVED}`)
            }
        }).catch(() => {
            throw Error(`${USER_INFO_RECEIVED}`)
        })
    }
}
