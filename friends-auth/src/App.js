import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoutes';
import { connect } from 'react-redux';

import Login from './components/Login';
import Friend from './components/Friends';
import { logOut } from './actions/actions';


function App(props) {

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
              <button onClick={props.logOut}>Logout</button>
            </ul>
              { props.loggedIn ? (
              <ProtectedRoute exact path='/friends' component={Friend} />
              ) : (
                <Route path={['/', '/login']} component={Login} />
              )
              }
            
          </div>
        </Router>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { logOut }
)(App);