import React, { Component } from 'react';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import ShowError from './ErrorHandling';

export default class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      done: false,
      description: 'Default description',
      dueDate: moment(new Date()).format('YYYY-MM-DD'),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.title = this.title.bind(this);

    this.firstField = React.createRef();
  }

  componentDidMount() {
    if (this.state.id > 0) {
      TodoDataService.retrieveTodo(AuthenticationService.currentUser(), this.state.id)
        .then((response) => {
          this.setState({
            description: response.data.description,
            dueDate: moment(response.data.dueDate).format('YYYY-MM-DD'),
            done: response.data.done,
          });
          this.firstField.current.focus();
        })
        .catch((error) => ShowError('Retrieve ' + this.state.id, error));
    } else {
      this.firstField.current.focus();
    }
  }

  onSubmit(values) {
    var user = AuthenticationService.currentUser();
    var todoid = this.state.id;
    if (todoid < 1) {
      TodoDataService.createTodo(user, {
        userName: user,
        description: values.description,
        dueDate: values.dueDate,
        done: values.done,
      })
        .then(() => this.props.history.goBack())
        .catch((error) => ShowError('Create', error));
    } else {
      TodoDataService.updateTodo(user, todoid, {
        id: todoid,
        userName: user,
        description: values.description,
        dueDate: values.dueDate,
        done: values.done,
      })
        .then(() => this.props.history.goBack())
        .catch((error) => ShowError('Update', error));
    }
  }

  cancelForm() {
    this.props.history.goBack();
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

  title(id) {
    if (id < 1) return 'New Todo';
    else return 'Edit Todo #' + id;
  }

  render() {
    let { description, dueDate, done } = this.state;

    return (
      <div>
        <h1>{this.title(this.state.id)}</h1>
        <div className='container'>
          <Formik
            initialValues={{ description, dueDate, done }}
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
                  <Field className='form-control' type='text' name='description' innerRef={this.firstField} />
                </fieldset>
                <fieldset className='form-group'>
                  <label>Due date</label>
                  <Field className='form-control' type='date' name='dueDate' />
                </fieldset>
                <fieldset className='form-group'>
                  <Field type='checkbox' name='done' />
                  <label htmlFor='done' className='form-check-label'>
                    Done
                  </label>
                </fieldset>
                <button type='submit' className='btn btn-success'>
                  Save
                </button>
                &nbsp;&nbsp;
                <button type='reset' className='btn btn-secondary'>
                  Reset
                </button>
                &nbsp;&nbsp;
                <button type='button' className='btn btn-warning' onClick={this.cancelForm}>
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
