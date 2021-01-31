import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import DateTimeHandling from './DateTimeHandling';
import Table from './Table';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function TodoList() {
  let history = useHistory();

  const [message, setMessage] = useState('');
  function addTodoClicked() {
    history.push('/todos/0');
  }

  function editTodoClicked(id) {
    history.push(`/todos/${id}`);
  }

  function doneTodoClicked(todo) {
    var user = AuthenticationService.currentUser();
    todo.done = !todo.done;
    TodoDataService.updateTodo(user, todo.id, todo).then(() => updater());
  }

  function deleteTodoClicked(id, description) {
    confirmAlert({
      message: description,
      title: 'Delete Todo#' + id + '?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            TodoDataService.deleteTodo(AuthenticationService.currentUser(), id).then((response) => {
              setMessage(`Todo #${id} deleted`);
              updater();
            });
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }

  const columns = useMemo(
    () => [
      {
        accessor: 'userName',
        show: false,
      },
      {
        Header: 'Done',
        accessor: 'done',
        Cell: (d) => {
          return (
            <input type='checkbox' className='checkbox' checked={d.value} onChange={() => doneTodoClicked(d.row.values)} />
          );
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        style: { textAlign: 'left' },
      },
      {
        Header: 'Due',
        accessor: 'dueDate',
        Cell: (cell) => {
          return DateTimeHandling.dateOnly(cell.value);
        },
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: (d) => {
          return (
            <span>
              <button
                className='btn btn-success'
                style={{width: "75px"}}
                onClick={(e) => {
                  editTodoClicked(d.value);
                }}
              >
                Edit
              </button>
              <button
                className='btn btn-warning'
                style={{width: "75px"}}
                onClick={(e) => {
                  deleteTodoClicked(d.value, d.row.values.description);
                }}
              >
                Delete
              </button>
            </span>
          );
        },
      },
    ],
    []
  );

  const [data, setData] = useState([]);

  let updater = async () => {
    const result = await TodoDataService.retrieveAllTodos(AuthenticationService.currentUser());
    setData(result.data);
  };

  useEffect(() => {
    updater();
  }, []);

  return (
    <div className='Table'>

      <h1>Todo List</h1>
      {message && <div className='alert alert-success'>{message}</div>}

      <div className='container'>
        <div className='yyrow'>
          <button className='btn btn-success' onClick={addTodoClicked}>
            Add
          </button>
          <p />
        </div>
        <Table columns={columns} data={data} />
      </div>
      <div className="container">&nbsp;{/* TODO just here to avoid being hidden below footer */}</div>  
      
    </div>
  );
}