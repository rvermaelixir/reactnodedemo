import {REMOVE_ALERT, SET_ALERT} from './types'
import {v4} from 'uuid' 


const setAlert =  (msg, alertType) => dispatch => {
    const id = v4();

    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    })
    setTimeout(() => { dispatch({
        type: REMOVE_ALERT,
        payload: id
    })}, 5000)
}


export default setAlert
