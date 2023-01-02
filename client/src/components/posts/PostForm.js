import React, {useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createPost } from '../../actions/post'

const PostForm = ({createPost}) => {
    const initialFormData = {
        text: ""
    }
    const [formData, setFormData] = useState(initialFormData)

    const {text} = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createPost(formData)
        setFormData({...initialFormData})
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => onSubmit(e)} >
                <textarea name="text" cols="30" rows="5" placeholder="Create a post" required="" value={text} onChange={(e) => onChange(e)}></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, {createPost})(PostForm)