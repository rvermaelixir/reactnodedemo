import React, {Fragment, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profile'

const AddExperience = ({addExperience}) => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        current: false,
        to: "",
        description: ""
    })
    
    const navigate = useNavigate()
    const {
        title,
        company,
        location,
        from,
        current,
        to,
        description
    } = formData
    
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onCheckboxChange = (e) => {
        setFormData({...formData, [e.target.name]: !current})
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        addExperience(formData, navigate)
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" onChange={e => onChange(e)} value={title} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" onChange={e => onChange(e)} value={company} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" onChange={e => onChange(e)} value={location} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  onChange={e => onChange(e)} value={from}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={e => onCheckboxChange(e)}/> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"  onChange={e => onChange(e)} disabled={current? "disabled": ""} value={to}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={e => onChange(e)}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(AddExperience)