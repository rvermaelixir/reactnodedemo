import Moment from 'react-moment'
import PropTypes from 'prop-types'

const ProfileExperience = ({experiences}) => {
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {experiences.map((experience)=>(
                <div key={experience._id}>
                    <h3 className="text-dark">{experience.company}</h3>
                    <p><Moment format="MMMM YYYY" >{experience.from}</Moment> - {(experience.to !==null)? <Moment format="MMMM YYYY">{experience.to}</Moment>:"Current"}</p>
                    <p><strong>Position: </strong>{experience.title}</p>
                    <p>
                    <strong>Description: </strong>{experience.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

ProfileExperience.propTypes = {
    experiences: PropTypes.array.isRequired
}

export default ProfileExperience