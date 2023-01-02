import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPost } from "../../actions/post"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { saveComment } from "../../actions/post"
import PostComments from "./PostComments"

const PostDetail = ({getPost, post, isLoading, saveComment}) => {
    const params = useParams()
    const initialFormData = {
        text: ""
    }
    const  [formData, setFormData] = useState(initialFormData)

    useEffect(() => {
        getPost(params.id)
    }, [getPost])

    const onChange = (e) => {
        setFormData({...formData , [e.target.name]: e.target.value})
    }

    const addComment = (e) => {
        e.preventDefault()
        saveComment(params.id, formData)
        setFormData(initialFormData)
    }

    const user = post && post.user 
    return (
        (!isLoading && post)?
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                <Link to={"/profile/"+(user && user._id)}>
                    <img className="round-img" src={user && user.avatar} alt=""/>
                    <h4>{user && user.name}</h4>
                </Link>
                </div>
                <div>
                <p className="my-1">
                    {post && post.text}
                </p>
                </div>
            </div>

            <div className="post-form">
                <div className="bg-primary p">
                <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit = {(e) => addComment(e)}>
                    <textarea name="text" cols="30" rows="5" placeholder="Comment on this post" value={formData.text} required="" onChange={(e) => onChange(e)}></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit"/>
                </form>
            </div>
            <PostComments />
        </Fragment>:
        <Fragment></Fragment>
    )
}

PostDetail.propTypes = {
    getPost: PropTypes.func.isRequired,
    saveComment: PropTypes.func.isRequired,
    post: PropTypes.object
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    post: state.post.post
})

export default connect(mapStateToProps, {getPost, saveComment})(PostDetail)