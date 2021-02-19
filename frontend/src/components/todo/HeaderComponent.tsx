import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge, NavDropdown } from 'react-bootstrap';
import TodoDataService from '../../api/todo/TodoDataService';
import ShowError, { ShowInfo } from './ErrorHandling';

class HeaderComponent extends Component<any> {
  constructor(props: any) {
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
              <NavDropdown id='AdminMenu' title='Admin'>
                <Nav.Item onClick={this.healtchCheck}>
                  Health Check <Badge>Todo</Badge>
                </Nav.Item>
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
