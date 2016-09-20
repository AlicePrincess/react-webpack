export const PLAY_CIRCLE = 'PLAY_CIRCLE'
export const PLAY_FLIP = 'PLAY_FLIP'

export function playCircle() {
    return (dispatch) => {
        dispatch({
            type: PLAY_CIRCLE
        }) 
    }
}
export function playFlip() {
    return (dispatch) => {
        dispatch({
            type: PLAY_FLIP
        }) 
    }
}

