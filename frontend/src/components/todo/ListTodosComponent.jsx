import React, { Component } from 'react';

export default class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, description: 'Learn React', done: false, dueDate: new Date() },
        { id: 2, description: 'Learn Spring Boot', done: false, dueDate: new Date() },
        { id: 3, description: 'Learn Kafka', done: false, dueDate: new Date() },
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <div className='container'>
          <table className='table'>
            <thead>
              <tr>
                <th hidden>ID</th>
                <th>Done</th>
                <th>Description</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td hidden>{todo.id}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.description}</td>
                  <td>{todo.dueDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
