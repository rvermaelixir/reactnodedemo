import PropTypes from 'prop-types'
import { Fragment } from 'react'

const ProfileSocialLinks = ({social}) => {
    return(
        <Fragment>
            {(social.youtube!=="")? <a href={social.youtube } target="_blank" rel="noreferrer"> <i className="fas fa-globe fa-2x"></i></a>: <Fragment></Fragment>}
            {(social.linkedin!=="")? <a href={social.linkedin } target="_blank" rel="noreferrer"><i className="fab fa-linkedin fa-2x"></i></a>: <Fragment></Fragment>}
            {(social.twitter!=="")? <a href={social.twitter } target="_blank" rel="noreferrer"><i className="fab fa-twitter fa-2x"></i></a>: <Fragment></Fragment>}
            {(social.facebook!=="")? <a href={social.facebook } target="_blank" rel="noreferrer"><i className="fab fa-facebook fa-2x"></i></a>: <Fragment></Fragment>}
            {(social.instagram!=="")? <a href={social.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram fa-2x"></i></a>: <Fragment></Fragment>}
        </Fragment>
    )
}

ProfileSocialLinks.propTypes = {
    social: PropTypes.object.isRequired
}
export default ProfileSocialLinks