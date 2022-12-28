import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Fragment } from "react"
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'
const Experience = ({experience, deleteExperience}) => {
    const experiences = 
        experience.map(experience => (
            <tr key={experience._id}>
                <td>{experience.company}</td>
                <td>{experience.title}</td>
                <td><Moment format="YYYY/MM/DD">{experience.from}</Moment>{" - "}{((experience.to !== null)? <Moment format="YYYY/MM/DD">{experience.to}</Moment>: "NOW")}</td>
                <td><button className="btn btn-danger" onClick={() => deleteExperience(experience._id)}>Delete</button></td>
            </tr>
        ))

    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th className="hide-sm">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table> 
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}


export default connect(null, {deleteExperience})(Experience)