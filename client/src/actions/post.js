import api from "../api";
import setAlert from "./alert";
import { GET_POSTS, GET_POST, DELETE_POST, CREATE_POST, POST_ERROR, TOGGLE_LIKE, TOGGLE_COMMENT } from "./types";



export const createPost = (formData) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.post("/posts", formData, config)
        dispatch({
            type: CREATE_POST,
            payload: res.data
        })
    } catch(err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        } 
        dispatch({
            type: POST_ERROR, 
            payload: {
                msg: err.response.statusText, 
                status: err.response.status
            }
        })
    }
}

export const getPosts = () => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.get("/posts", {}, config)
        dispatch({type: GET_POSTS, payload: res.data})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const deletePost = (postId) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.delete("/posts/"+postId, {}, config)
        dispatch(setAlert("Post deleted succesfully", 'success'))
        dispatch({type: DELETE_POST, payload: postId})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const likePost = (postId) => async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.put("/posts/"+postId+"/like", {}, config)
        dispatch({type: TOGGLE_LIKE, payload: {likes: res.data.likes, id: postId}})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const unlikePost = (postId) => async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.put("/posts/"+postId+"/unlike", {}, config)
        dispatch({type: TOGGLE_LIKE, payload: {likes: res.data.likes, id: postId}})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const getPost = (postId) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.get("/posts/"+postId, {}, config)
        dispatch({type: GET_POST, payload: res.data})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const saveComment = (postId, formData) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.put("/posts/"+postId+"/comments", formData, config)
        dispatch({type: TOGGLE_COMMENT, payload: res.data})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}

export const deleteComment = (commentId, postId) => async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type': "Application/json"
            }
        }
        const res = await api.delete("/posts/"+postId+"/comments/"+commentId, {}, config)
        dispatch({type: TOGGLE_COMMENT, payload: res.data})
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
    }
}