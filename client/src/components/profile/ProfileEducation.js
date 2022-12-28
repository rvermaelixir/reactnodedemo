import Moment from 'react-moment'
import PropTypes from 'prop-types'
const ProfileEducation = ({educations}) => {
    return(
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {educations.map((education)=>(
                <div key={education._id}>
                    <h3>{education.school}</h3>
                    <p><Moment format="MMMM YYYY" >{education.from}</Moment> - {(education.to !==null)? <Moment format="MMMM YYYY">{education.to}</Moment>:"Current"}</p>
                    <p><strong>Degree: </strong>{education.degree}</p>
                    <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
                    <p>
                    <strong>Description: </strong>{education.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

ProfileEducation.propTypes = {
    educations: PropTypes.array.isRequired
}

export default ProfileEducation