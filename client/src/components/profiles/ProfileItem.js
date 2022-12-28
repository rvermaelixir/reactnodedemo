import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
const ProfileItem = ({profile}) => {
    const profiles = profile.skills.map((skill, index) => (
        <li className="text-primary" key={profile._id+"_"+index}>
            <i className="fas fa-check" key={profile._id+"icon_"+index}></i> {skill}
        </li>               
    ))
    return (
        <div className="profile bg-light" key={profile._id+ ""}>
            <img
                className="round-img"
                src={profile.user.avatar}
                alt=""
            />
            <div>
                <h2>{profile.user.name}</h2>
                <p>{profile.status}</p>
                {profile.location?<p>Seattle, WA</p>:<Fragment></Fragment>}
                <Link to={'/profile/'+profile.user._id} profile={profile} className="btn btn-primary">View Profile</Link>
            </div>
            
            <ul>
                {
                    profiles
                }
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem