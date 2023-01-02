import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { deletePost } from '../../actions/post'
import { likePost, unlikePost } from '../../actions/post'
import { Link } from 'react-router-dom'

const PostItem = ({post, auth, deletePost, likePost, unlikePost}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <a href={"/profile/"+post.user._id}>
                <img className="round-img" src={post.user.avatar} alt="" />
                <h4>{post.user.name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                    {post.text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="mm/dd/yyyy">{post.date}</Moment>
                </p>
                <button type="button" className="btn btn-light" onClick={() => likePost(post._id)}>
                    <i className="fas fa-thumbs-up"></i>
                    <span>{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light" onClick={() => unlikePost(post._id)}>
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={"/post/"+post._id} className="btn btn-primary">
                    Discussion <span className="comment-count">{post.comments.length}</span>
                </Link>
                {
                    (auth.user._id === post.user._id)?<button type="button" onClick={() => deletePost(post._id)} className="btn btn-danger">
                            <i className="fas fa-times"></i>
                        </button>
                    : <Fragment></Fragment>
                }
                
            </div>
        </div>
    )
}
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, {deletePost, likePost, unlikePost})(PostItem) 