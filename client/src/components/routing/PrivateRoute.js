import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from '../auth/Login'
const PrivateRoute = ({children, auth: {isAuthenticated}}) => (
    (isAuthenticated)? children : (<Login>children</Login>) 
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth 
})

export default connect(mapStateToProps, null)(PrivateRoute)