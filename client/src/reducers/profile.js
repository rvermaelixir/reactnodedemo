import { PROFILE_ERROR, GET_PROFILE, GET_PROFILES, GET_GITHUB_REPOS } from "../actions/types"
const initialState = {
    profile: null,
    profiles: [],
    error: {},
    repos: [],
    isLoading: true
}

const profile = (state = initialState,  action) => {
    const {type, payload} = action

    switch(type){
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                isLoading: false
            }
        case PROFILE_ERROR: 
            return {
                ...state,
                error: payload,
                isLoading: false,
                profile: null
            }
        case GET_PROFILES:
            return {
                ...state,
                isLoading: false,
                profiles: payload
            }   
        case GET_GITHUB_REPOS: 
            return {
                ...state,
                isLoading: false,
                repos: payload
            }
        default:
            return initialState 
    }
}

export default profile