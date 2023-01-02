import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "./types";
import api from '../api';
import setAlert from "./alert";
import setAuthToken from "../helpers/setAuthToken";

export const loadUser = token => async dispatch => {
    try{
        const user = await api.get('/auth')
        dispatch({type: USER_LOADED, payload: user.data})
    }catch(err){ 
        dispatch({type: AUTH_ERROR})
    }
}

export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "Application/json"
        }
    }
    try {
        const body = JSON.stringify({email, password})
        const res = await api.post('/auth', body, config)
        setAuthToken(res.data.token)
        const user = await api.get('/auth')
        const payload = {
            user: user.data,
            token: res.data.token
        }
        dispatch(setAlert("User Loging Successfull", 'success'))
        dispatch({type: LOGIN_SUCCESS, payload})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
        dispatch({type: LOGIN_FAILED})
    }
}

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
        setAuthToken(res.data.token)
        const user = await api.get('/auth')
        dispatch(setAlert("User Registered", 'success'))
        dispatch({type: REGISTER_SUCCESS, payload: {user: user.data, token:res.data.token}})
    } catch (err){
        const errors =  err.response.data.error
        
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        
        dispatch({type: REGISTER_FAIL})
    }
}

export const logout = () => dispatch =>{
    dispatch({type: LOGOUT})
    dispatch(setAlert("User logged out ", 'success'))
}