import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import ErrorComponent from './ErrorComponent';
import LogoutComponent from './LogoutComponent';
import TodoComponent from './TodoComponent';
import TodoListComponent from './TodoListComponent';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeComponent from './HomeComponent';

class TodoApp extends Component {

  render() {
    const progCss = {
      background: 'linear-gradient(to right, rgba(33, 177, 89, .1), rgba(33, 177, 89, 1))',
    };
    return (
      <Router>
        <HeaderComponent />
        <ToastContainer transition={Slide} progressStyle={progCss} />
        <Switch>
          <Route path='/' exact component={LoginComponent} />
          <Route path='/login' component={LoginComponent} />
          <Route path='/logout' component={LogoutComponent} />
          <AuthenticatedRoute path='/welcome/:name' component={HomeComponent} />
          <AuthenticatedRoute path='/todos/:id' component={TodoComponent} />
          <AuthenticatedRoute path='/todos' component={TodoListComponent} />
          <Route component={ErrorComponent} />
        </Switch>
        <FooterComponent />
      </Router>
    );
  }
}

export default TodoApp;
