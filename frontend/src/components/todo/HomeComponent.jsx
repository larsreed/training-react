import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class HomeComponent extends Component {

  render() {
    return (
      <>
        <h1>Welcome, {this.props.match.params.name}!</h1>
        <div className='container'>
          <Button onClick={() => { this.props.history.push('/todos'); }}>Show Todo List</Button>
        </div>
      </>
    );
  }
}
