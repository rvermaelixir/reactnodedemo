import api from "../api";
import setAlert from "./alert";
import { GET_PROFILE, PROFILE_ERROR, GET_PROFILES , ACCOUNT_DELETED, GET_GITHUB_REPOS} from "./types";

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await api.get("/profile/me")
        dispatch({type: GET_PROFILE, payload: res.data})
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const createProfile = (profileParams, navigate, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.post("/profile", JSON.stringify(profileParams), config)
        setAlert(edit? "Profile Created Successfully": "Profile Updated Successfully", 200)
        dispatch({type: GET_PROFILE, payload: res.data})
        navigate("/dashboard")
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
        dispatch({
            type: PROFILE_ERROR, 
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
    }
}

export const addExperience = (experienceParams, navigate) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.put("/profile/experience", JSON.stringify(experienceParams), config)
        setAlert("Experience Added Successfully", 200)
        dispatch({type: GET_PROFILE, payload: res.data})
        navigate("/dashboard")
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
        dispatch({
            type: PROFILE_ERROR, 
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
    }
}

export const deleteExperience = (id) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.delete(`/profile/experience/${id}`, {}, config)
        setAlert("Experience Removed Successfully", 200)
        dispatch({type: GET_PROFILE, payload: res.data})
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
    }
}



export const addEducation = (educationParams, navigate) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.put("/profile/education", JSON.stringify(educationParams), config)
        setAlert("Education Added Successfully", 200)
        dispatch({type: GET_PROFILE, payload: res.data})
        navigate("/dashboard")
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
        dispatch({
            type: PROFILE_ERROR, 
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
    }
}


export const deleteEducation = (id) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.delete(`/profile/education/${id}`, {}, config)
        setAlert("Education Removed Successfully", 200)
        dispatch({type: GET_PROFILE, payload: res.data})
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
    }
}

export const deleteAccount = () => async dispatch  => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.delete(`/profile`, {}, config)
        setAlert("Experience Removed Successfully", 200)
        dispatch({type: ACCOUNT_DELETED, payload: res.data})
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
    }
}

export const getProfiles = () => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.get(`/profile`, {}, config)
        dispatch({type: GET_PROFILES, payload: res.data})
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const getProfileById = (userId) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.get(`/profile/user/${userId}`, {}, config)
        dispatch({type: GET_PROFILE, payload: res.data})
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const getGitHubRepos = (gitHubUsername) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.get(`/profile/github/${gitHubUsername}`, {}, config)
        dispatch({type: GET_GITHUB_REPOS, payload: res.data})
    }catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}