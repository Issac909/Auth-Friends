import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoutes';
import { useDispatch } from 'react-redux';

import Login from './components/Login';
import Friend from './components/Friends';


function App() {

  const dispatch = useDispatch();
  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch({ type: 'DELETE_LOGIN', payload: false })
  }

  return (
        <Router>
          <div className='App'>
            <ul>
              <li>
              <Link to='/'>Login</Link>
              </li>
              <li>
              <Link to='/friends'>Friends</Link>
              </li>
              <button onClick={handleLogout}>Logout</button>
              <Route exact path={['/', '/login']} component={Login} />
              <ProtectedRoute exact path='/friends' component={Friend} />
            </ul>
          </div>
        </Router>

  )
}

export default App;