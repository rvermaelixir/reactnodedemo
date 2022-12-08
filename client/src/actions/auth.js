import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
import api from '../api';
import setAlert from "./alert";

export const register = ({name, email, phone, password}) => async dispatch => {
    const newUser = {name, email, phone, password}
    const config = {
        headers: {
            'Content-Type': "Application/json"
        }
    }
    try {
        const body = JSON.stringify(newUser)
        const res = await api.post('users', body, config)
        dispatch(setAlert("User Registered", 'success'))
        dispatch(REGISTER_SUCCESS, res.data)
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        
        dispatch(REGISTER_FAIL, err)
    }
}

export default register