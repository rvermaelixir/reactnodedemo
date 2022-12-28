import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Navigate, Link } from "react-router-dom";
import { Fragment } from "react";
import { getCurrentProfile } from "../../actions/profile";
import { useEffect } from "react";
import Spinner from "../layouts/Spinner";
import Experience from "./Experience";
import Education from "./Education"
import { deleteAccount } from "../../actions/profile";

const Dashboard = ({getCurrentProfile, deleteAccount, auth, profile: {profile, isLoading}}) => {
    useEffect(()=>{
        getCurrentProfile()
    }, [])
    const experience =  (profile === null)? <Fragment></Fragment>: <Experience experience={profile.experience}/>
    const education =  (profile === null)? <Fragment></Fragment>: <Education education={profile.education} />
    const dashboardLinks = (profile === null)?
    (
        <Fragment>
            <Link className="btn btn-primary" to="/manage-profile"><i className="fas fa-user-circle text-light"></i> Add Profile</Link>
        </Fragment>
    ):(
        <Fragment>
            <Link to="/manage-profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/add-experience" className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
            <Link to="/add-education" className="btn btn-light"
            ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        </Fragment>
    )
    return (
        
        (isLoading) ? <Spinner/> :( 
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {auth.name}</p>
            <div className="dash-buttons">
               {dashboardLinks}
            </div>
            {experience}
            {education}
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>

                    Delete My Account
                </button>
            </div>
        </Fragment>)
    )
}


Dashboard.prototype ={
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)