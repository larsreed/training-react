import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

export default class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: 'Default description',
      dueDate: moment(new Date()).format('YYYY-MM-DD'),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    this.state.id>0 && TodoDataService.retrieveTodo(AuthenticationService.currentUser(), this.state.id).then((response) =>
      this.setState({
        description: response.data.description,
        dueDate: moment(response.data.dueDate).format('YYYY-MM-DD'),
      })
    );
  }

  onSubmit(values) {
    var user = AuthenticationService.currentUser();
    var todoid = this.state.id;
    if (todoid < 1) {
      TodoDataService.createTodo(user, {
        userName: user,
        description: values.description,
        dueDate: values.dueDate,
      }).then(() => this.props.history.goBack());
    } else {
      TodoDataService.updateTodo(user, todoid, {
        id: todoid,
        userName: user,
        description: values.description,
        dueDate: values.dueDate,
      }).then(() => this.props.history.goBack());
    }
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = 'Description must be defined';
    } else if (values.description.length < 3) {
      errors.description = 'Description must be at least 3 characters';
    }
    if (!moment(values.dueDate).isValid) {
      errors.dueDate = 'Invalid date';
    }
    return errors;
  }

  render() {
    let { description, dueDate } = this.state;

    return (
      <div>
        <h1>Todo {this.state.id}</h1>
        <div className='container'></div>
        <Formik
          initialValues={{ description, dueDate }}
          onSubmit={this.onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          validate={this.validate}
          enableReinitialize={true}
        >
          {(props) => (
            <Form>
              <ErrorMessage name='description' component='div' className='alert alert-warning' />
              <ErrorMessage name='dueDate' component='div' className='alert alert-warning' />
              <fieldset className='form-group'>
                <label>Description</label>
                <Field className='form-control' type='text' name='description' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Due date</label>
                <Field className='form-control' type='date' name='dueDate' />
              </fieldset>
              <button type='submit' className='btn btn-success'>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
