import { useEffect } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Alert from './components/layouts/Alert'
// Redux Requirements
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './helpers/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile'
import Post from './components/posts/Index';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser())
  }, [])

  return(
    <Provider store={store}>
      <Router>
          <Navbar/>
          <section className="container">
            <Alert/>
            <Routes>
              <Route exact path="/" element={<Landing />}/>
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/register" element={<Register />}/>
              <Route exact path="/profiles" element={<Profiles />}/>
              <Route exact path="/profile/:id" element={<Profile />} />
              <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route exact path="/manage-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
              <Route exact path="/add-experience" element={<PrivateRoute><AddExperience /></PrivateRoute>} />
              <Route exact path="/add-education" element={<PrivateRoute><AddEducation /></PrivateRoute>} />
              <Route exact path="/posts" element={<PrivateRoute><Post /></PrivateRoute>} />
            </Routes>
          </section>
      </Router>
    </Provider>
  )
}

export default App;
