import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'foo',
      password: '',
      hasFailed: false,
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
    if (this.state.username === 'foo' && this.state.password === 'bar') {
      this.props.history.push(`/welcome/${this.state.username}`);
      AuthenticationService.registerLogin(this.state.username, this.state.password);
      this.setState({
        hasFailed: false,
      });
    } else {
      this.setState({
        hasFailed: true,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className='container'>
          {this.state.hasFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
          <div></div>
          User Name: <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          Password: <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          <button className='btn btn-success' onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
