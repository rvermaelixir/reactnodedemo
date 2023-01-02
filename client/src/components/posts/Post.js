import React, {Fragment, useEffect} from 'react'
import PostForm from './PostForm'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Post = ({getPosts, posts}) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])

    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

            <PostForm />
            <div className="posts"> 
                {
                    posts.map((post) => (
                        <PostItem post={post} key={post._id}/>
                    ))
                }  
            </div>
            
        </Fragment>
    )   
}

Post.propTypes = {
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts: state.post.posts
})

export default connect(mapStateToProps, {getPosts})(Post)