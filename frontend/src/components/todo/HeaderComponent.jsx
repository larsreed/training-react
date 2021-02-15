import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService.js';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import TodoDataService from '../../api/todo/TodoDataService.js';
import ShowError, { ShowInfo } from './ErrorHandling.js';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.healtchCheck = this.healtchCheck.bind(this);
  }

  healtchCheck() {
    AuthenticationService.isUserLoggedIn() &&
      TodoDataService.isAlive()
        .then(() => ShowInfo('OK'))
        .catch((error) => {
          ShowError('Health check', error);
        });
  }

  render() {
    let isLoggedIn = AuthenticationService.isUserLoggedIn();
    let userName = AuthenticationService.currentUser();
    return (
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Navbar.Brand href='/'>ToDo</Navbar.Brand>
          <Nav className='mr-auto'>
            {isLoggedIn && <Nav.Link href={`/welcome/${userName}`}>Home</Nav.Link>}
            {isLoggedIn && <Nav.Link href='/todos'>Todos</Nav.Link>}
            {isLoggedIn && (
              <NavDropdown title='Admin'>
                <Nav.Item onClick={this.healtchCheck}>Health Check (todo)</Nav.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn && <Nav.Link href='/login'>Login</Nav.Link>}
            {isLoggedIn && (
              <Nav.Link href='/logout' onClick={AuthenticationService.logout}>
                Logout {AuthenticationService.currentUser()}
              </Nav.Link>
            )}
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);
