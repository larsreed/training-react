import axios from 'axios';
import { BASE_URL } from '../../components/todo/Constants';

class TodoDataService {
  retrieveAllTodos(user) {
    return axios.get(BASE_URL + `/users/${user}/todos`);
  }

  retrieveTodo(user, id) {
    return axios.get(BASE_URL + `/users/${user}/todos/${id}`);
  }

  deleteTodo(user, id) {
    return axios.delete(BASE_URL + `/users/${user}/todos/${id}`);
  }

  updateTodo(user, id, todo) {
    return axios.put(BASE_URL+ `/users/${user}/todos/${id}`, todo);
  }

  createTodo(user, todo) {
    return axios.post(BASE_URL + `/users/${user}/todos`, todo);
  }
}

export default new TodoDataService();
