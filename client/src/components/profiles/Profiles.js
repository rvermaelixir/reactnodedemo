import { Fragment ,useEffect} from 'react'
import {getProfiles}  from '../../actions/profile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileItem from '../profiles/ProfileItem'
const Profiles = ({getProfiles, profile}) => {

    useEffect(()=>{
        getProfiles()
    }, [])

    return (
        <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div className="profiles">
                {
                    profile.profiles.map((profile) => (
                            <ProfileItem profile={profile} key={"profile_"+profile._id}/>
                    ))
                }
            </div>
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)