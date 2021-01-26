import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService.js';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

class HeaderComponent extends Component {
  render() {
    let isLoggedIn = AuthenticationService.isUserLoggedIn();
    let userName = AuthenticationService.currentUser();
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">ToDo</Navbar.Brand>
          <Nav className="mr-auto">
            {isLoggedIn && (<Nav.Link href={`/welcome/${userName}`}>Home</Nav.Link>)}
            {isLoggedIn && (<Nav.Link href="/todos">Todos</Nav.Link>)}
          </Nav>
          <Nav>
          {!isLoggedIn && (<Nav.Link href="/login">Login</Nav.Link>)}
          {isLoggedIn && (<Nav.Link href="/logout" onClick={AuthenticationService.logout}>Logout</Nav.Link>)}
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(HeaderComponent);