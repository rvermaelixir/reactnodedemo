import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({isAuthenticated}) => {
  const links =  
    <div className="buttons">
      <Link to="/register" className="btn btn-primary">Sign Up</Link>
      <Link to="/login" className="btn btn-light">Login</Link>
    </div>
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          {
          !isAuthenticated ? links : <Fragment></Fragment>
          }
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapPropToState = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapPropToState, null)(Landing)