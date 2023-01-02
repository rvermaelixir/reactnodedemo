import {Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layouts/Alert'
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile'
import Post from './components/posts/Post';
import PostDetail from './components/posts/PostDetail';
import NotFound from './components/layouts/NotFound';
import { Fragment } from 'react';
const Routes = () => {
    return (
    
        <section className="container">
            <Alert/>
            <Fragment>
                <Route path="*" element={<NotFound/>}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/register" element={<Register />}/>
                <Route exact path="/profiles" element={<Profiles />}/>
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route exact path="/manage-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
                <Route exact path="/add-experience" element={<PrivateRoute><AddExperience /></PrivateRoute>} />
                <Route exact path="/add-education" element={<PrivateRoute><AddEducation /></PrivateRoute>} />
                <Route exact path="/posts" element={<PrivateRoute><Post /></PrivateRoute>} />
                <Route exact path="/post/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
            </Fragment>
        </section>
    
  )
}