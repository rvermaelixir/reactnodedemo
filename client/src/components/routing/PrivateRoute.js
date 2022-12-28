import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'
const PrivateRoute = ({children, auth: {isLoading, isAuthenticated}}) => (
     (!isAuthenticated && !isLoading) ? (<Navigate to="/login" />) : children
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth 
})

export default connect(mapStateToProps, null)(PrivateRoute)