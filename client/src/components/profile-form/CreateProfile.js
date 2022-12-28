import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CreateProfile = ({createProfile, getCurrentProfile, profile: {profile: profile}}) => {

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    edit: false
  })

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(()=>{
    getCurrentProfile()
    if(profile !== null){
      setFormData({
        company: profile.company || "",
        website: profile.website || "",
        location: profile.location || "",
        status: profile.status || "",
        skills: profile.skills && profile.skills.join(",") || "",
        bio: profile.bio || "",
        githubusername: profile.githubusername || "",
        youtube: profile.social && profile.social[0] && profile.social[0].youtube || "",
        facebook: profile.social && profile.social[0] && profile.social[0].facebook || "",
        instagram: profile.social && profile.social[0] && profile.social[0].instagram || "",
        linkedin: profile.social && profile.social[0] && profile.social[0].linkedin || "",
        twitter: profile.social && profile.social[0] && profile.social[0].twitter || "",
        edit: true
      })
    }
  }, [])

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    facebook,
    instagram,
    linkedin,
    twitter, 
    edit
  } = formData
  
  const navigate = useNavigate()

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    createProfile(formData, navigate, edit)
  }

  const emptySocialLinks =  twitter === "" && youtube === "" && facebook === "" && instagram === "" && linkedin === ""
  return (
    <Fragment>
        <h1 className="large text-primary">
            {!edit ? "Create Your Profile" : "Edit Profile"}
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your
            profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e)=> onSubmit(e)}>
            <div className="form-group">
            <select name="status" onChange={(e) => onChange(e)} value={status}>
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
            </select>
            <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
            <input type="text" placeholder="Company" name="company" value={company}  onChange={(e) => onChange(e)}/>
            <small className="form-text">Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
            <input type="text" placeholder="Website" name="website"  value={website} onChange={(e) => onChange(e)}/>
            <small className="form-text">Could be your own or a company website</small>
            </div>
            <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)}/>
            <small className="form-text">City & state suggested (eg. Boston, MA)</small>
            </div>
            <div className="form-group">
            <input type="text" placeholder="* Skills" name="skills"  value={skills} onChange={(e) => onChange(e)}/>
            <small className="form-text">Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP)</small>
            </div>
            <div className="form-group">
            <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                onChange={(e) => onChange(e)}
                value= {githubusername}
            />
            <small className="form-text">If you want your latest repos and a Github link, include your
                username</small>
            </div>
            <div className="form-group">
            <textarea placeholder="A short bio of yourself" name="bio" onChange={(e) => onChange(e)} value={bio}/>
            <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
            <button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
                Add Social Network Links
            </button>
            <span>Optional</span>
            </div>
            
            {
              (displaySocialInputs || !emptySocialLinks) && <Fragment>
                <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x"></i>
                  <input type="text" placeholder="Twitter URL" name="twitter" value={twitter}  onChange={(e) => onChange(e)}/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x"></i>
                  <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => onChange(e)}/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x"></i>
                  <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => onChange(e)}/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => onChange(e)}/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x"></i>
                  <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => onChange(e)}/>
                </div>
              </Fragment>
            }
            
            <input type="submit" className="btn btn-primary my-1" />
            <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
    </Fragment>
  )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps,{ createProfile, getCurrentProfile })(CreateProfile)