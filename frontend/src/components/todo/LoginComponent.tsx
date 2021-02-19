import React, { Component } from 'react';
// import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService';
import ShowError from './ErrorHandling';
import { RouteComponentProps } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


interface LoginProps extends RouteComponentProps<any> {
  name: string;
}

interface LoginState {
  username: string;
  password: string;
}

export default class LoginComponent extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: 'foo',
      password: '',
    };
    this.loginClicked = this.loginClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this)
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.loginClicked();
  }

  loginClicked() {
    AuthenticationService.authenticate(this.state.username, this.state.password)
      .then((resp) => {
        AuthenticationService.registerJwtLogin(this.state.username, resp.data.token);
        //   const healthTimer = setInterval(() => {
        //     AuthenticationService.isUserLoggedIn() && TodoDataService.isAlive()
        //       .then(() => console.log("OK"))
        //       .catch((error) => {
        //         console.log(error)
        //         ShowError("backend", error)
        //       });
        //   }, 15000); // send the request every 15 seconds
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch((error) => ShowError('Login', error));
  }

  render() {
    return (
      <div className="maxWidth">
        <h1>Login</h1>
        <div className='container'>

        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            autoComplete="username"
            value={this.state.username}
            onChange={(v) => this.setState({ username: v.target.value })}
      />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="password"
            value={this.state.password}
            onChange={(v) => this.setState({ password: v.target.value })}
      />
        </Form.Group>
        <Button block type="submit" disabled={!this.validateForm()}>
          Login
        </Button>
      </Form>
          </div>
      </div>
    );
  }
}
