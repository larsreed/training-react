import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService.js';

class HeaderComponent extends Component {
  render() {
    let isLoggedIn = AuthenticationService.isUserLoggedIn();
    return (
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div>
            <a href='/' className='navbar-brand'>
              TodoApp
            </a>
          </div>
          <ul className='navbar-nav'>
            {isLoggedIn && (
              <li>
                <Link to='/welcome/foo' className='nav-link'>
                  Home
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to='/todos' className='nav-link'>
                  Todos
                </Link>
              </li>
            )}
          </ul>
          <ul className='navbar-nav navbar-collapse justify-content-end'>
            {!isLoggedIn && (
              <li>
                <Link to='/login' className='nav-link'>
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to='/logout' onClick={AuthenticationService.logout} className='nav-link'>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);