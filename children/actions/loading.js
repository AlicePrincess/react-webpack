import config from '../config'
import axios from 'axios'
import PxLoader from '../utils/PxLoader'
import {QUESTIONS_RECEIVED} from '../actions/answer'
import _ from 'underscore'

export const PRELOADIN_COMPLETE = 'PRELOADIN_COMPLETE'
export const UPDATE_LOADING_ACCOMPLISH = 'UPDATE_LOADING_ACCOMPLISH'

// random element which decides download some specific resources 
const loadingVar = Date.now()
const resources = [
    // require('../public/images/academicreport/QRCode.png'),
    require('../public/images/countdown/blackboard.png'),
    require('../public/images/countdown/tipBackground.png'),
    require(`../public/images/failure/failure${loadingVar%3+1}.png`),
    // require(`../public/images/loading/loadImg${loadingVar%3}.gif`),
    // require(`../public/images/examination/circle_0.png`),
    // require(`../public/images/examination/circle_1.png`),
]

export const LOADING_RECEIVED = 'LOADING_RECEIVED'

export function fetchLoading(){
    return (dispatch) => {
        // fetch those preloading resources 
        const loader = new PxLoader()

        // preload part of questions 
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
                    _.each(_.range(response.data.data.length/3), (index)=>{
                        loader.addImage(response.data.data[index].images_url)
                    })
                    _.forEach(resources, (res) => {
                        loader.addImage(res)
                    })

                    loader.addProgressListener((e)=>{
                        dispatch({
                            type: UPDATE_LOADING_ACCOMPLISH,
                            payload: {
                                accomplish: e.completedCount*100/e.totalCount
                            }
                        })
                    })
                    loader.addCompletionListener(()=>{
                        dispatch({
                            type: PRELOADIN_COMPLETE,
                            payload: {
                                loadingVar,
                            }
                        })

                        // preload all question images
                        const questionImagesLoader = new PxLoader()
                        _.each(response.data.data, (question)=>{
                            questionImagesLoader.addImage(question.images_url)
                        })
                        questionImagesLoader.start()
                    })
                    loader.start()
                }else{
                    throw Error(`${QUESTIONS_RECEIVED}`)
                }
            }).catch(() => {
                throw Error(`${QUESTIONS_RECEIVED}`)
            })
    }
}
