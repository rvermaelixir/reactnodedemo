import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, ACCOUNT_DELETED } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    user: null,
    isAuthenticated: null
}

const auth = (state = initialState, action) => {
    const {type, payload} = action
    
    switch(type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
           return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false,
                token: payload.token
            }
        case AUTH_ERROR: 
        case LOGOUT:
        case LOGIN_FAILED:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null
            }
        case  USER_LOADED: 
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
            }
        case  LOGIN_SUCCESS: 
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
            }
        case ACCOUNT_DELETED: 
            localStorage.removeItem('token')
            return initialState
        default: 
            return state
    }
}

export default auth;