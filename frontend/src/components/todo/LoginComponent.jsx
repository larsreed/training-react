import React, { Component } from 'react';
// import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import ShowError from './ErrorHandling.js';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'foo',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
      <div>
        <h1>Login</h1>
        <div className='container'>
          <div className='container'>
            <p>
              Username: <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
            </p>
            <p>
              Password: <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
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
