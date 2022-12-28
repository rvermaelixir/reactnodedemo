import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { useEffect, Fragment } from 'react'
import {getGitHubRepos} from '../../actions/profile'

const ProfileGitHubRepos = ({repos, username, getGitHubRepos}) => {
    
    useEffect(()=>{
        getGitHubRepos(username)
    },[])

    return (
        (repos && repos.length !== 0)?
        (<div className="profile-github">
        <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
        </h2>
        {repos.map((repo) => (
            <div className="repo bg-white p-1 my-1" key={repo.id}>
                <div>
                    <h4><a href={repo.html_url} target="_blank"
                        rel="noopener noreferrer">{repo.name}</a></h4>
                    <p>
                        {repo.description}
                    </p>
                </div>
                <div>
                    <ul>
                        <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li className="badge badge-dark">Watchers: {repo.watchers}</li>
                        <li className="badge badge-light">Forks: {repo.forks}</li>
                    </ul>
                </div>
            </div>
        ))}
        </div>): <Fragment></Fragment>)
        
    
}

ProfileGitHubRepos.propTypes = {
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
    getGitHubRepos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, {getGitHubRepos})(ProfileGitHubRepos)