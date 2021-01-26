import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';
import AuthenticationService from './AuthenticationService.js';

export default class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this)
    this.state = {
      welcomeMessage: '',
    };
  }

  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className='container'>
          Welcome, {this.props.match.params.name}! Your <Link to='/todos'>task list</Link>
        </div>
        <div className='container'>
          Click here for welcome message!
          <button onClick={this.retrieveWelcomeMessage} className='btn btn-success'>
            Click Me!
          </button>
        </div>
        <div className='container'>{this.state.welcomeMessage}</div>
      </>
    );
  }

  retrieveWelcomeMessage() {
    HelloWorldService.executeHelloWorldService(AuthenticationService.currentUser())
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => this.handleSuccessfulResponse(response))
      .catch(error => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({ welcomeMessage: response.data.message });
  }

  handleError(error) {
    this.setState({ welcomeMessage: error.response.data.message });
  }
}
