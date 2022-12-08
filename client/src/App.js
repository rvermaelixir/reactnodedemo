import { Fragment } from 'react';
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

const App = () => 
  <Provider store={store}>
    <Router>
      
        <Navbar/>
        <section className='container'>
        <Alert/>
        <Routes>
          <Route exact path="/"  element={<Landing />}></Route>
         
         
            <Route exact path="/login"  element={<Login />}>
            </Route>
            <Route exact path="/register"  element={<Register />}>
            </Route>
          
        </Routes>
        </section>
    </Router>
    
  </Provider>


export default App;
