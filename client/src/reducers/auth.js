import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: true,
    user: null,
    isAuthenticated: null
}

export default function(state = initialState, action) {
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

        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null
            }

        DEFAULT: 
            return state
    }
}
