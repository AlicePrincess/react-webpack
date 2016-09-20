import config from '../config'
import axios from 'axios'
import _ from 'underscore'

export const ANSWER_EMERGENCY = 'ANSWER_EMERGENCY'
export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED'
export const ACHIEVEMENT_RECEIVED = 'ACHIEVEMENT_RECEIVED'
export const PICK_OPTION = 'PICK_OPTION'
export const RECORD_PROGRESS = 'RECORD_PROGRESS'
export const RESTORE_ANSWER = 'RESTORE_ANSWER'
export const CHECK_ANSWERS = 'CHECK_ANSWERS'
export const COMPLETE_EXAMINATION = 'COMPLETE_EXAMINATION'
export const ENTER_SHEET = 'ENTER_SHEET'
export const ENTER_REPORT = 'ENTER_REPORT'
export const OTHER_ANSWERS = 'OTHER_ANSWERS'
export const QUESTION_BG_RECEIVED = 'QUESTION_BG_RECEIVED'

// persist current answer progress
export function recordProgress(timeProgress){
    return (dispatch) => {
        dispatch({
            type: RECORD_PROGRESS,
            payload: {
                timeProgress,
            }
        })
    }
}

// clear current answer countdown progress
export function clearTimeProgress(timeProgress){
    return (dispatch) => {
        dispatch({
            type: RECORD_PROGRESS,
            payload: {
                timeProgress: 0,
            }
        })
    }
}

// just left over a little time to answer question
export function emergency() {
    return (dispatch) => {
        dispatch({
            type: ANSWER_EMERGENCY,
            payload: {
                emergency: true,
            },
        })
    }
}

export function completeExamination() {
    return (dispatch) => {
        dispatch({
            type: COMPLETE_EXAMINATION,
        })
    }
}

export function checkAnswers(questions, answers, user){
    return (dispatch) => {
        const checkData = _.map(answers, (answer, index)=>{
            return {
                _id: questions[index]._id,
                key: answer
            }
        })

        axios.post(config.api.questions.check, {
            token: user.get('token'),
            keys: checkData
        }).then((response) => {
            if (response.status === 200) {
                const achivement = response.data.data
                if (achivement.common_comment) {
                    achivement.common_comment.images_url += "?imageView2/1/w/100/h/100/interlace/0/q/100"
                }

                dispatch({
                    type: ACHIEVEMENT_RECEIVED,
                    payload: response.data.data,
                })
            } else {
                throw Error(`${ACHIEVEMENT_RECEIVED}`)
            }
        }).catch(() => {
            throw Error(`${ACHIEVEMENT_RECEIVED}`)
        })
    }
}

export function otherAnswers(id){
    return (dispatch) => {
        axios.post(config.api.questions.other,{
            r_id: id
        }).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: OTHER_ANSWERS,
                        payload: response.data.data,
                    })
                } else {
                    throw Error(`${OTHER_ANSWERS}`)
                }
            }).catch(() => {
                throw Error(`${OTHER_ANSWERS}`)
            })
    }
}

export function fetchQuestionBG(questionID, imageURL){
    return (dispatch) => {
        // prevent duplicated request
        // dispatch({
        //     type: QUESTION_BG_RECEIVED,
        //     payload: {
        //         questionID: questionID,
        //         color: `#fef6e7`,
        //     }
        // })

        // const avgURL = `${imageURL.split('?')[0]}?imageAve`
        // axios.get(avgURL).then((res)=>{
        //     dispatch({
        //         type: QUESTION_BG_RECEIVED,
        //         payload: {
        //             questionID: questionID,
        //             color: `#${res.data.RGB.split('x')[1]}`,
        //         }
        //     })
        // }).catch(()=>{
        //     dispatch({
        //         type: QUESTION_BG_RECEIVED,
        //         payload: {
        //             questionID: questionID,
        //             color: `#fef6e7`,
        //         }
        //     })
        // })
    } 
}


export function fetchQuestions(){
    return (dispatch) => {
        // get answer progress from local persist
        if (localStorage.getItem('answerProgress')) {
            dispatch({
                type: RESTORE_ANSWER,
            })
            return
        }

        axios.get(config.api.questions.get)
            .then((response) => {
                if (response.status === 200) {
                    // add image filter
                    _.each(response.data.data, (question)=>{
                        question.images_url += "?imageView2/0/w/300/h/300/q/90" 
                    })
                    
                    dispatch({
                        type: QUESTIONS_RECEIVED,
                        payload: response.data.data,
                    })
                } else {
                    throw Error(`${QUESTIONS_RECEIVED}`)
                }
            }).catch(() => {
                throw Error(`${QUESTIONS_RECEIVED}`)
            })
    }
}

export function pickOption(questionIndex, answerIndex) {
    return (dispatch) => {
        dispatch({
            type: PICK_OPTION,
            payload: {
                questionIndex,
                answerIndex,
            },
        })
    }
}

export function enterSheet() {
    return (dispatch) => {
        dispatch({
            type: ENTER_SHEET,
        })
    }
}

export function enterReport() {
    return (dispatch) => {
        dispatch({
            type: ENTER_REPORT,
        })
    }
}
