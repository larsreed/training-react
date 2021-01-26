import React, { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import DateTimeHandling from './DateTimeHandling';

export default class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
    };
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.editTodoClicked = this.editTodoClicked.bind(this);
    this.doneTodoClicked = this.doneTodoClicked.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    TodoDataService.retrieveAllTodos(AuthenticationService.currentUser()).then((response) =>
      this.setState({ todos: response.data })
    );
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
        <div className='container'>
          <div className='yyrow'>
            <button className='btn btn-success' onClick={this.addTodoClicked}>
              Add
            </button>
            <p />
          </div>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th hidden>ID</th>
                <th>Done</th>
                <th className='text-left'>Description</th>
                <th>Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td hidden>{todo.id}</td>
                  <td>
                    <input
                      name='done'
                      type='checkbox'
                      readOnly={false}
                      checked={todo.done}
                      onChange={() => this.doneTodoClicked(todo)}
                    />
                  </td>
                  <td className='text-left'>{todo.description}</td>
                  <td>{DateTimeHandling.dateOnly(todo.dueDate)}</td>
                  <td>
                    <button className='btn btn-success' onClick={() => this.editTodoClicked(todo.id)}>
                      Edit
                    </button>
                    &nbsp;
                    <button className='btn btn-warning' onClick={() => this.deleteTodoClicked(todo.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  deleteTodoClicked(id) {
    TodoDataService.deleteTodo(AuthenticationService.currentUser(), id).then((response) => {
      this.setState({ message: `${id} deleted` });
      this.refreshData();
    });
  }

  doneTodoClicked(todo) {
    console.log(todo);
    var user = AuthenticationService.currentUser();
    todo.done = !todo.done;
    TodoDataService.updateTodo(user, todo.id, todo).then(() => this.refreshData());
  }

  editTodoClicked(id) {
    this.props.history.push(`/todos/${id}`);
  }

  addTodoClicked() {
    this.props.history.push('/todos/0');
  }
}
