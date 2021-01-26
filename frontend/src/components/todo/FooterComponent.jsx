import React, { Component } from 'react';
import { VERSION } from './Constants';

export default class FooterComponent extends Component {
  render() {
    return (
      <footer className='footer'>
        <span className='text-muted'>v.{VERSION} © LarsR 2020</span>
      </footer>
    );
  }
}
