import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import DateTimeHandling from './DateTimeHandling';
import Table, { BooleanFilter, SelectColumnFilter } from './Table';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ShowError, { ShowInfo } from './ErrorHandling';

export default function TodoList() {
  let history = useHistory();

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
            TodoDataService.deleteTodo(AuthenticationService.currentUser(), id)
              .then((response) => {
                ShowInfo(`Todo #${id} deleted`);
                updater();
              })
              .catch((error) => ShowError('Delete', error));
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
        Filter: BooleanFilter,
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
        filter: 'fuzzyText',
      },
      {
        Header: 'Due',
        accessor: (value) => DateTimeHandling.dateOnly(value.dueDate),
        id: 'dueDate',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        disableSortBy: true,
        disableFilters: true,
        Cell: (d) => {
          return (
            <span>
              <button
                className='btn btn-success'
                style={{ width: '75px' }}
                onClick={(e) => {
                  editTodoClicked(d.value);
                }}
              >
                Edit
              </button>
              <button
                className='btn btn-warning'
                style={{ width: '75px' }}
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

  const initalState = {
    hiddenColumns: columns.map((column) => {
      if (column.show === false) return column.accessor || column.id;
      else return null;
    }),
    filters: [{ id: 'done', value: 'false' }],
    sortBy: [
      {
        id: 'dueDate',
        desc: false,
      },
    ],
  };

  let updater = async () => {
    try {
      const result = await TodoDataService.retrieveAllTodos(AuthenticationService.currentUser());
      setData(result.data);
    } catch (error) {
      ShowError('List', error);
    }
  };

  useEffect(() => {
    updater();
  }, []);

  return (
    <div className='Table'>
      <h1>Todo List</h1>
      <div className='container'>
        <div className='yyrow'>
          <button className='btn btn-success' onClick={addTodoClicked}>
            Add new task
          </button>
          <p />
        </div>
        <Table columns={columns} data={data} initially={initalState} showGlobalFilter={false} />
      </div>
      <div className='container'>&nbsp;{/* TODO just here to avoid being hidden below footer */}</div>
    </div>
  );
}
