import {fromJS} from 'immutable'
import _ from 'underscore'
import {
    ANSWER_COUNT_DOWN,
    QUESTIONS_RECEIVED,
    ANSWER_EMERGENCY,
    PICK_OPTION,
    RECORD_PROGRESS,
    RESTORE_ANSWER,
    ACHIEVEMENT_RECEIVED,
    COMPLETE_EXAMINATION,
    ENTER_SHEET,
    ENTER_REPORT,
    OTHER_ANSWERS,
    QUESTION_BG_RECEIVED,
} from '../actions/answer'

const initialState = fromJS({
    keys: [],
    questions: [],
    achivement: undefined,
    emergency: false,
    enterSheet: false,
    enterReport: false,
    otherAnswers:undefined,
})

export default (state = initialState, action) => {
    switch (action.type) {
        case QUESTIONS_RECEIVED:
            return state.set('questions', fromJS(action.payload))
        case ENTER_SHEET:
            return state.set('enterSheet', true)
        case ENTER_REPORT:
            return state.set('enterReport', true)
        case QUESTION_BG_RECEIVED:
            return state
            // return fromJS(_.map(state.get('questions').toJS(), (question) => {
            //     if (question._id === action.payload.questionID) {
            //         question.bgColor = action.payload.color
            //     }
            //     return question
            // }))
        case RESTORE_ANSWER:
            const data = JSON.parse(localStorage.getItem('answerProgress'))
            if (data) {
                return state.set('questions', fromJS(data.questions))
                    .set('keys', fromJS(data.keys))
            }else{
                return state
            }
        case COMPLETE_EXAMINATION:
            localStorage.removeItem('answerProgress')
            return initialState
        case ANSWER_EMERGENCY:
            return state.set('emergency', fromJS(action.payload.emergency))
        case ACHIEVEMENT_RECEIVED:
            return state.set('achivement', fromJS({
                interestingUrl:action.payload.interesting&&action.payload.interesting.images_url,
                interestingTitle:action.payload.interesting&&action.payload.interesting.title,
                interestingQues:action.payload.interesting&&action.payload.interesting.question,
                score:action.payload.score,
                teacherName: action.payload.common_comment.name,
                avatar: action.payload.common_comment.images_url,
                comment: action.payload.common_comment.comment,
                rightCount: action.payload.right,
                id:action.payload.result_id,
                keys: state.get('keys'), // clear answer progress
                questions: state.get('questions'),
            }))
            case OTHER_ANSWERS:
                return state.set('otherAnswers', fromJS({
                  nickname:action.payload.user.nickname,
                  avatar:action.payload.user.avatar,
                     score:action.payload.score,
                    // teacherName: action.payload.common_comment.name,
                    // avatar: action.payload.common_comment.images_url,
                     comment: action.payload.common_comment.comment,
                    rightCount: action.payload.right,

                }))

        case PICK_OPTION:
            const newState = state.update('keys', keys=>keys.insert(action.payload.questionIndex, action.payload.answerIndex))
            localStorage.setItem('answerProgress', JSON.stringify({
                questions: newState.get('questions').toJS(),
                keys: newState.get('keys').toJS(),
            }))
            return newState
        case RECORD_PROGRESS:
            localStorage.setItem('timeProgress', JSON.stringify(action.payload.timeProgress))
            return state
        default:
            return state
    }
}
