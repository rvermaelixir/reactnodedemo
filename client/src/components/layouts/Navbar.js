import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth' 
import { connect } from 'react-redux'

const Navbar = ({logout, auth: {isAuthenticated, isLoading}}) => {
    const authLinks = 
        <Fragment>
            <li><Link to="/posts"><i className="fas fa-user"></i>
                    <span className="hide-sm"> Posts</span></Link></li>
            <li><Link to="/dashboard"><i className="fas fa-user"></i>
                    <span className="hide-sm"> Dashboard</span></Link></li>
            <li>
                <a onClick={logout} href="/">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm"> Logout</span>
                </a>
            </li>
        </Fragment>

    const openLinks = 
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li> 
        </Fragment>
    
    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
            <li><Link to="/profiles">Developers</Link></li>
            {
                !isLoading && isAuthenticated? authLinks: openLinks
            }
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
}

const mapPropToState = state => ({
    auth: state.auth
})

export default connect(mapPropToState, {logout})(Navbar)