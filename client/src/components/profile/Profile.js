import { Fragment, useEffect } from "react"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getProfileById } from "../../actions/profile"
import ProfileSocialLinks from "./ProfileSocialLinks"
import ProfileEducation from "./ProfileEducation"
import ProfileExperience from "./ProfileExperience"
import ProfileGitHubRepos from "./ProfileGitHubRepos"
const Profile = ({profile: mainProfile, getProfileById}) => {
    
   const params = useParams()
   
    useEffect(()=>{
        getProfileById(params.id)
    }, [getProfileById, params.id])

    const profile =  mainProfile && mainProfile.profile 
    const social = profile && profile.social
    return (
        (profile === null)? <h1>No Profile Found</h1> :
        <Fragment>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

            <div className="profile-grid my-1">
                {/* <!-- Top --> */}
                <div className="profile-top bg-primary p-2">
                    <img
                        className="round-img my-1"
                        src={profile.user.avatar}
                        alt=""
                    />
                    <h1 className="large">{profile.user.name}</h1>
                    <p className="lead">{profile.user.status}</p>
                    {profile.location?<p>{profile.location}</p>: <Fragment></Fragment>}
                    <div className="icons my-1">
                        <ProfileSocialLinks social={social} />
                    </div>
                </div>
                {/* <!-- About --> */}
                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">{profile.user.name+'\'s Bio'}</h2>
                    <p>
                    {profile.bio}
                    </p>

                    { (profile && profile.skills.length !== 0)? 
                        <Fragment>
                        <div className="line"></div>
                        <div className="skills">{
                            profile.skills.map(skill => (
                                <div className="p-1" key={skill}><i className="fa fa-check"></i>{skill}</div>
                            ))
                        }</div>
                        </Fragment>: <Fragment></Fragment>
                    }
                </div>
                {/* <!-- Experience --> */}
                {
                    (profile && profile.experience.length !==0)? 
                    <ProfileExperience experiences={profile.experience} />
                    : <Fragment></Fragment>
                }

                {/* <!-- Education --> */}
                
                {
                    (profile && profile.education.length !==0)? 
                    <ProfileEducation educations={profile.education} />
                    : <Fragment></Fragment>
                }
                {/* <!-- Github --> */}
                
                
                <ProfileGitHubRepos username={profile.githubusername}></ProfileGitHubRepos>
                    
            </div>
        </Fragment>
    )
    
}

Profile.propType = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileById})(Profile)