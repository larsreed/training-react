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
    // console.log("try");
    AuthenticationService.authenticate(this.state.username, this.state.password)
      .then((resp) => {
        // console.log('then '+resp);
        AuthenticationService.registerJwtLogin(this.state.username, resp.data.token);
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch((error) => {
        // console.log("catch "+error);
        this.setState({
          hasFailed: true,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className='container'>
          {this.state.hasFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
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
