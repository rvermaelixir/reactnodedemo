import { GET_POSTS, GET_POST, DELETE_POST, CREATE_POST, POST_ERROR, TOGGLE_LIKE, TOGGLE_COMMENT } from "../actions/types";
const initialState = {
    post: null,
    posts: [],
    error: {},
    isLoading: true
}

const post = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CREATE_POST:
            return {
                ...state,
                isLoading: false,
                posts: [payload, ...state.posts]
            }

        case GET_POSTS:
            return {
                ...state,
                isLoading: false,
                posts: payload
            }
        case  GET_POST:
            return {
                ...state,
                isLoading: false,
                post: payload
            }
        case DELETE_POST:
            return {
                ...state,
                isLoading: false,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case POST_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
                post: null
            }
        case TOGGLE_LIKE: 
            return {
                ...state,
                isLoading: false,
                posts: state.posts.map(post => (post._id === payload.id)? {...post, likes: payload.likes}: post)
            }

        case TOGGLE_COMMENT: 
            return {
                ...state,
                isLoading: false,
                posts: state.posts.map(post => (post._id === payload.id)? {...post, comments: payload.comments}: post),
                post: {...state.post, comments: payload.comments}
            }
      
        default: 
            return {
                ...state,
                isLoading: false
            }
    }
}

export default post