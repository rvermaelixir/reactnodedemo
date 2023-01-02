import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Fragment } from 'react'
import { deleteComment } from '../../actions/post'
const PostComments = ({user, post, deleteComment}) => {
    return(
        <div className="comments">
            {post.comments.map((comment) => (
                <div className="post bg-white p-1 my-1" key={comment._id}>
                    <div>
                        <a href={"/profile/user/"+comment.user}>
                            <img
                            className="round-img"
                            src={comment.avatar}
                            alt=""
                            />
                            <h4>{comment.name}</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                            {comment.text}
                        </p>
                        <p className="post-date">
                            Posted on <Moment format="MM/DD/YYYY">{comment.date}</Moment>
                        </p>
                        {(user._id === comment.user)? <button      
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteComment(comment._id, post._id)}
                        >
                            <i className="fas fa-times"></i>
                        </button>: <Fragment></Fragment>}
                    </div>
              </div>
            ))}
        </div>
        
    )
}


PostComments.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    post: state.post.post
})
export default connect(mapStateToProps, {deleteComment})(PostComments)
// export default PostComments