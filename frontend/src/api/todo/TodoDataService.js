import axios from 'axios';

class TodoDataService {
  retrieveAllTodos(user) {
    return axios.get(`http://localhost:8080/users/${user}/todos`);
  }

  retrieveTodo(user, id) {
    return axios.get(`http://localhost:8080/users/${user}/todos/${id}`);
  }

  deleteTodo(user, id) {
    return axios.delete(`http://localhost:8080/users/${user}/todos/${id}`);
  }

  updateTodo(user, id, todo) {
    return axios.put(`http://localhost:8080/users/${user}/todos/${id}`, todo);
  }

  createTodo(user, todo) {
    return axios.post(`http://localhost:8080/users/${user}/todos`, todo);
  }
}

export default new TodoDataService();
