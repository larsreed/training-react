import React, { Component } from 'react';
// import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService';
import ShowError from './ErrorHandling';
import { RouteComponentProps } from 'react-router-dom';

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
          <div className='container'>
            <p>
              Username:{' '}
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={(v) => this.setState({ username: v.target.value })}
              />
            </p>
            <p>
              Password:{' '}
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={(v) => this.setState({ password: v.target.value })}
              />
            </p>
            <p>&nbsp;</p>
            <button onClick={this.loginClicked} className='btn btn-success'>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
